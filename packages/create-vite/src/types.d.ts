type ColorFunc = (str: string | number) => string;

type Framework = {
  name: string;
  display: string;
  description?: string;
  color: ColorFunc;
};
