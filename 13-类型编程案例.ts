type DeepRecord<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: Obj[Key] extends Record<string, any>
    ? DeepRecord<Obj[Key]>
    : Obj[Key];
} & Record<string, any>;

type Data = {
  aaa?: number;
  bbb: {
    ccc: number;
    ddd: string;
  };
  eee: {
    ccc: {
      fff: number;
    };
  };
};

type DeepRecordResult = DeepRecord<Data>;

const obj: DeepRecordResult = {
  aaa: 1,
  bbb: {
    ccc: 1,
    ddd: "1",
    hhh: 1,
  },
  eee: {
    ccc: {
      fff: 1,
      iii: 1,
    },
  },
  ggg: 1,
};

type GenerateType<Keys extends keyof any> = {
  [Key in Keys]: {
    [Key2 in Key]: "desc" | "asc";
  } & {
    [Key3 in Exclude<Keys, Key>]: false;
  };
}[Keys];

type GenerateTypeResult = GenerateType<"aaa" | "bbb" | "ccc">;

const aa: GenerateTypeResult = {
  aaa: "asc",
  bbb: false,
  ccc: false,
};

const bb: GenerateTypeResult = {
  aaa: false,
  bbb: "desc",
  ccc: false,
};

const cc: GenerateTypeResult = {
  aaa: "asc",
  bbb: "desc",
  ccc: false,
};
