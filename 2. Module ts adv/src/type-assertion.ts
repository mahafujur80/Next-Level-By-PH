// type assertion

type Status = "success" | "rejected" | "fail";

const sentStatus : string = "success";

const showStatus = (status : Status )=>{
  console.log("your current status is ", status)
};

showStatus(sentStatus as Status)  //! after use (as) the showStatus function only check type not value

//* non-null  assertion

interface Config {
    port?: number;
};

const config : Config = {
 port: 24234
};

const currentPort : number = config.port!;
const currentPort2 : number = config.port as number;

//* constant assertion

const configaration = {
    name: "munna",
    roll: 741772
} as const;

// configaration.name = "nomoon"; //! not its readonly property