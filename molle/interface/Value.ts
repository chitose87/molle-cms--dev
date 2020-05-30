export interface IValue {
  // id?: string;
  ref?: any;

  name?: string;
  type?: IValueType;
  value?: any;
}

export const ValueTypes = {
  text: <IValueType>{label: "text"},
  paragraph: <IValueType>{label: "paragraph"},
  number: <IValueType>{label: "number"},
  img: <IValueType>{label: "img"},
  html: <IValueType>{label: "html"},
};

export interface IValueType {
  label: string;
}
