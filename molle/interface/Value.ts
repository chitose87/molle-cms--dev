export interface IValue {
  // id?: string;
  ref?: any;

  name?: string;
  type?: string;
  value?: any;
  // extends?: any;
  extendsId?: string;

  childrenId?:string[];
  superValue?: IValue;
}

export const ValueTypes = {
  text: <IValueType>{label: "文字", val: "text"},
  // paragraph: <IValueType>{label: "複数行", val: "paragraph"},
  number: <IValueType>{label: "数字", val: "number"},
  img: <IValueType>{label: "画像", val: "img"},
  html: <IValueType>{label: "HTML", val: "html"},
};

export interface IValueType {
  label: string;
  val: string;
}
