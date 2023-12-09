import { TailSpin } from "react-loader-spinner";

import React from "react";

const Loading = () => {
  return (
    <div className="loader loadermain">
<TailSpin
  height="80"
  width="80"
  color="#0066b2"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
    </div>
  );
};

export default Loading;
