import React from "react";

const Skeleton = ({ loading }) => {
  return (
    <>
      {loading && (
        <>
          <div className="skeleton">
            <div className="skeleton_header"></div>
            <div className="skeleton_body"></div>
            <div className="skeleton_body"></div>
            <div className="skeleton_body"></div>
          </div>
          <div className="skeleton">
            <div className="skeleton_header"></div>
            <div className="skeleton_body"></div>
            <div className="skeleton_body"></div>
            <div className="skeleton_body"></div>
          </div>
        </>
      )}
    </>
  );
};

export default Skeleton;
