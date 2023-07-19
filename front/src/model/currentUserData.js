import React, { useState } from "react";

export const currentUser =  {
    userId: "",
    username: "",
    email: "",
    password:"",
    department: "",
    role: "",
    profileImage: "",
        phone:""
        // recentChat: "hey this your boss!",
    };

    export let routeId = "";

    export function setRouteId(newRouteId) {
      routeId = newRouteId;
    }
