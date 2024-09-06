"use client";
import React from "react";

const Error = ({ error, reset }: { error: any; reset?: () => void }) => {
  if (error?.status === 404) {
    return (
      <div className="flex relative h-screen items-center justify-center bg-white-1 ">
        <img
          src="/images/errors/404.jpg"
          alt="404 error"
          className="object-contain aspect-auto"
        />
      </div>
    );
  }
  if (error?.status === 403) {
    return (
      <div className="flex relative h-screen items-center justify-center bg-white-1 ">
        <img
          src="/images/errors/403.png"
          alt="403 error"
          className="object-contain aspect-auto"
        />
      </div>
    );
  }

  if (error?.status === 500) {
    return (
      <div className="flex relative h-screen items-center justify-center bg-white-1 ">
        <img
          src="/images/errors/500.png"
          alt="505 error"
          className="object-contain aspect-auto"
        />
      </div>
    );
  }
  return (
    <div className="flex relative h-screen items-center justify-center bg-white-1 ">
      <img
        src="/images/errors/general_error.png"
        alt="unexpected error"
        className="object-contain aspect-auto"
      />
    </div>
  );
};

export default Error;
