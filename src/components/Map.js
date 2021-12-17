import React, { useState, useEffect } from "react";

const Map = ({ routes, airlines, airports }) => {



  return (
    <svg className="map" viewBox="-180 -90 360 180">
      <g transform="scale(1 -1)">
        <image
          xlinkHref="equirectangular_world.jpg"
          href="equirectangular_world.jpg"
          x="-180"
          y="-90"
          height="100%"
          width="100%"
          transform="scale(1 -1)"
        />

        {/* for each route */}
        <g key="">
          <circle className="source" cx="" cy="">
            <title></title>
          </circle>
          <circle className="destination" cx="" cy="">
            <title></title>
          </circle>
          {/* <path d={`M${x1} ${y1} L ${x2} ${y2}`} /> */}
        </g>
        {/* end route */}
      </g>
    </svg>
  );
};

export default Map;
