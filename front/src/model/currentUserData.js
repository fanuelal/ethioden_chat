import React, { useState } from "react";

export const currentUser =  {
    userId: "",
    username: "",
    email: "",
    password:"",
    department: "",
    role: "",
        profileImg: "",
        // recentChat: "hey this your boss!",
    };

    export let routeId = "";

    export function setRouteId(newRouteId) {
      routeId = newRouteId;
    }
