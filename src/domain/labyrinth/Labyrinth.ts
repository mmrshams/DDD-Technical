
import { Entity } from "src/domain/common/entity.abstract";

type LabyrinthProps = {
  userId: string,
}

export enum LabyrinthFulfillmentType {
  empty = 0,
  filled = 1,
}
/**[NOTE]: Ride is the aggregate root */
export class Labyrinth extends Entity {

  private startCoordination: [number, number] = undefined
  private endCoordination: [number, number] = undefined
  private grid: number[][]
  private userId: string

  private constructor({
    userId
  }: LabyrinthProps, uuid?: string) {
    super(uuid);
    this.userId = userId
    this.grid = []
  }

  get getGrid() {
    return this.grid;
  }

  get getUserId() {
    return this.userId;
  }

  get getStartCoordination() {
    return this.startCoordination;
  }

  get getEndCoordination() {
    return this.endCoordination;
  }


  public setStartCoordination(lat: number, lon: number) {
    this.startCoordination = [lat, lon]
  }

  public setEndCoordination(lat: number, lon: number) {
    this.endCoordination = [lat, lon]
  }

  public setPlayField(lat: number, lon: number, type: LabyrinthFulfillmentType) {
    this.grid[lat][lon] = type
  }

  public generateSolution() {
    // TODO fix error handling
    /** do not forget to set validations before generate solution */
    if (this.startCoordination.length === undefined || this.endCoordination.length === undefined) {
      throw Error('First Set up start and end coordinations')
    }
    const rows = this.grid.length;
    const cols = this.grid[0].length;
  
    const directions = [
      [-1, 0, 'up'],
      [1, 0, 'down'],
      [0, -1, 'left'],
      [0, 1, 'right']
    ];
  
    const queue = [{ position: this.startCoordination, distance: 0, path: [] }];
    const visited = new Array(rows).fill(null).map(() => new Array(cols).fill(false));
  
    visited[this.startCoordination[0]][this.startCoordination[1]] = true;
  
    while (queue.length > 0) {
      const { position, distance, path } = queue.shift();
  
      if (position[0] === this.endCoordination[0] && position[1] === this.endCoordination[1]) {
        return { distance, path };
      }
  
      for (const [dx, dy, dir] of directions) {
        const newRow = position[0] + Number(dx);
        const newCol = position[1] +  Number(dy);
  
        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          this.grid[newRow][newCol] !== 1 &&
          !visited[newRow][newCol]
        ) {
          visited[newRow][newCol] = true;
          queue.push({
            position: [newRow, newCol],
            distance: distance + 1,
            path: [...path, dir]
          });
        }
      }
    }
    return -1; // No path found.
  }



  public static create(props: LabyrinthProps, guid?: string) {
    if (!props.userId) {
      throw new Error('Unable to create the Labyrinth!');
    }
    return new Labyrinth(props, guid);
  }

}