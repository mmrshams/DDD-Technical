import {
  Labyrinth,
  LabyrinthFulfillmentType,
  LabyrinthProps,
} from '../labyrinth';
import { faker } from '@faker-js/faker';

describe('Labyrinth', () => {
  let userId: string;
  beforeEach(() => {
    userId = faker.string.uuid();
  });
  it('Should attributes of labyrinth will be qual to feed value when instantiated ', async () => {
    const feed: LabyrinthProps = {
      userId,
      endCoordination: [0, 0],
      startCoordination: [0, 4],
      grid: [],
    };
    const labyrinth = Labyrinth.create(feed);
    expect(labyrinth.getEndCoordination).toEqual(feed.endCoordination);
    expect(labyrinth.getUserId).toEqual(feed.userId);
    expect(labyrinth.getStartCoordination).toEqual(feed.startCoordination);
    expect(labyrinth.getGrid).toEqual(feed.grid);
  });

  it('Should startCoordination of labyrinth will be qual to feed startCoordination when setStartCoordination triggered', async () => {
    const feed: LabyrinthProps = {
      userId,
      endCoordination: [0, 0],
      startCoordination: [0, 4],
      grid: [],
    };
    const labyrinth = Labyrinth.create(feed);
    labyrinth.setStartCoordination(0, 4);
    expect(labyrinth.getStartCoordination).toEqual(feed.startCoordination);
  });

  it('Should endCoordination of labyrinth will be qual to feed endCoordination when setEndCoordination triggered', async () => {
    const feed: LabyrinthProps = {
      userId,
      endCoordination: [0, 0],
      startCoordination: [0, 4],
      grid: [],
    };
    const labyrinth = Labyrinth.create(feed);
    labyrinth.setEndCoordination(0, 0);
    expect(labyrinth.getEndCoordination).toEqual(feed.endCoordination);
  });

  it('Should grid of labyrinth will be qual to target grid when setPlayField called based on scenario ', async () => {
    const feed: LabyrinthProps = {
      userId,
      endCoordination: [0, 0],
      startCoordination: [0, 4],
      grid: [],
    };
    const labyrinth = Labyrinth.create(feed);
    labyrinth.setPlayField(0, 1, LabyrinthFulfillmentType.empty);
    labyrinth.setPlayField(0, 2, LabyrinthFulfillmentType.empty);
    labyrinth.setPlayField(0, 3, LabyrinthFulfillmentType.filled);
    expect(labyrinth.getGrid).toEqual([[0, 0, 0, 1]]);
  });

  it('Should return proper solution when have enough feeds ', async () => {
    const feed: LabyrinthProps = {
      userId,
      endCoordination: [0, 0],
      startCoordination: [0, 4],
      grid: [],
    };
    const labyrinth = Labyrinth.create(feed);
    labyrinth.setPlayField(0, 1, LabyrinthFulfillmentType.empty);
    labyrinth.setPlayField(0, 2, LabyrinthFulfillmentType.empty);
    labyrinth.setPlayField(0, 3, LabyrinthFulfillmentType.empty);
    labyrinth.generateSolution(userId);
    expect(labyrinth.generateSolution(userId)).toEqual({
      distance: 4,
      path: ['left', 'left', 'left', 'left'],
    });
  });
});
