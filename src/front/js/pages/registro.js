import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

export const Registro = (props) => {
  return (
    <div className="container mt-5">
      <form className="mt-5">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="d-flex justify-content-center mb-2">
          <button type="submit" className="btn btn-primary w-100">
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};
