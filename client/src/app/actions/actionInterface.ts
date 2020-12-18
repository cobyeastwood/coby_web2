export default interface Action {
  type: string;
  payload: {
    _id?: number;
    element?: object;
    typicode?: object;
  };
}
