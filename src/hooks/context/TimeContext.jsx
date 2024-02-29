import React, { useState } from "react";

const TimeContext = React.createContext({});

const TimeProvider = ({ children }) => {
  const [time, setTime] = useState("");

  return (
    <TimeContext.Provider value={{ time, setTime }}>
      {children}
    </TimeContext.Provider>
  );
};

const useTime = () => React.useContext(TimeContext);

export { TimeProvider, useTime };
