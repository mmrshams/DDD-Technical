import { Entity } from '../../domain/common/entity.abstract';

export type LabyrinthProps = {
  userId: string;
  startCoordination?: [number, number];
  endCoordination?: [number, number];
  grid?: number[][];
};

export enum LabyrinthFulfillmentType {
  empty = 0,
  filled = 1,
}
/**[NOTE]: Labyrinth is the aggregate root */
export class Labyrinth extends Entity {
  private startCoordination: [number, number] = undefined;
  private endCoordination: [number, number] = undefined;
  private grid: number[][];
  private userId: string;

  private constructor(
    { userId, startCoordination, endCoordination, grid }: LabyrinthProps,
    uuid?: string,
  ) {
    super(uuid);
    this.userId = userId;
    this.startCoordination = startCoordination;
    this.endCoordination = endCoordination;
    grid ? (this.grid = grid) : (this.grid = []);
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

  private userIdValidator(userId) {
    if (this.userId !== userId) throw Error('Permission Denied!');
  }

  public setStartCoordination(lat: number, lon: number) {
    this.startCoordination = [lat, lon];
    this.setPlayField(lat, lon, LabyrinthFulfillmentType.empty);
  }

  public setEndCoordination(lat: number, lon: number) {
    this.endCoordination = [lat, lon];
    this.setPlayField(lat, lon, LabyrinthFulfillmentType.empty);
  }

  public setPlayField(
    lat: number,
    lon: number,
    type: LabyrinthFulfillmentType,
  ) {
    while (this.grid.length <= lat) {
      this.grid.push([]);
    }
    while (this.grid[lat].length <= lon) {
      this.grid[lat].push(LabyrinthFulfillmentType.empty);
    }
    this.grid[lat][lon] = type;
  }

  public generateSolution(userId: string) {
    this.userIdValidator(userId);
    /** do not forget to set validations before generate solution */
    if (
      this.startCoordination.length === undefined ||
      this.endCoordination.length === undefined
    ) {
      throw Error('First Setup start and end coordinations');
    }

    /**[NOTE]: measure vertical and horizontal size of the problem space */
    const rows = this.grid.length;
    const cols = this.grid[0].length;

    /**[NOTE]: direction mapping */
    const directions = [
      [-1, 0, 'up'],
      [1, 0, 'down'],
      [0, -1, 'left'],
      [0, 1, 'right'],
    ];

    /**[NOTE]:
     * Queue: is the place that we trace paths and distance from start point
     * Visited: help to avoid add met houses in queue
     */
    const queue = [{ position: this.startCoordination, distance: 0, path: [] }];
    const visited = new Array(rows)
      .fill(null)
      .map(() => new Array(cols).fill(false));

    /**[NOTE]: set the start point as visited */
    visited[this.startCoordination[0]][this.startCoordination[1]] = true;

    /**[NOTE]: while loop plan is to trace all houses if if found will return distance + path
     * that will be mutate on each iteration if its not found after while we have -1 means no path founds!
     */
    while (queue.length > 0) {
      const { position, distance, path } = queue.shift();

      /**[NOTE]: if start and end point were the same just return the result */
      if (
        position[0] === this.endCoordination[0] &&
        position[1] === this.endCoordination[1]
      ) {
        return { distance, path };
      }

      /**[NOTE]: BFs tracing like first check all surrounded houses */
      for (const [dx, dy, dir] of directions) {
        const newRow = position[0] + Number(dx);
        const newCol = position[1] + Number(dy);

        /**[NOTE]: in this condition i check each new Row or new Col should be smaller than
         *  grid boundaries and in other hand bigger than negative numbers  */
        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          this.grid[newRow][newCol] !== 1 &&
          !visited[newRow][newCol]
        ) {
          /**[NOTE]: move trough path */
          visited[newRow][newCol] = true;
          queue.push({
            position: [newRow, newCol],
            distance: distance + 1,
            path: [...path, dir],
          });
        }
      }
    }
    /**[NOTE]: No path found. */
    return -1;
  }

  public static create(props: LabyrinthProps, guid?: string) {
    if (!props.userId) {
      throw new Error('Unable to create the Labyrinth!');
    }
    return new Labyrinth(props, guid);
  }
}
