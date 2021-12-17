import React, { useState, useEffect } from "react";

const Map = ({ routes }) => {
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

        {routes.map((route, index) => {
          const srcX = route.src.long;
          const srcY = route.src.lat;
          const destX = route.dest.long;
          const destY = route.dest.lat;

          return (
            <g key={`route-${index}`}>
              <circle className="source" cx={srcX} cy={srcY}>
                <title></title>
              </circle>
              <circle className="destination" cx={destX} cy={destY}>
                <title></title>
              </circle>
              <path d={`M${srcX} ${srcY} L ${destX} ${destY}`} />
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export default Map;
