import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Card({ data }) {
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  return (
    
    <motion.div
      variants={item}
      className="card card-bordered shadow-2xl p-2 m-2 md:m-1 md:p-1 md:my-5"
    >
      <figure>
        <img
          src={`img/${data.profile_path}`}
          alt={data.b_name}
          className="h-72 w-full object-scale-down md:w-full md:h-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{data.b_name}</h2>
        <div className="badge badge-primary">{data.types}</div>
        <div class="justify-end card-actions">
          <Link
            to={`/book/${data.b_id}`}
            className="btn btn-sm btn-outline btn-ghost"
          >
            ยืม
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default Card;
