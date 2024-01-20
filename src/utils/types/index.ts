export type Coordinate = { x: number; y: number };

export type Polygon = Coordinate[];

export type ShapeDescription = {
  name: string;
  active: string[];
  highlight: string[];
};

export interface Mapping extends ShapeDescription {
  polygons: Polygon[];
}
