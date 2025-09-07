"use client";

import React from "react";

interface InsuranceLogosProps {
  className?: string;
  showTitle?: boolean;
  title?: string;
  size?: "sm" | "md" | "lg";
}

export default function InsuranceLogos({ 
  className = "", 
  showTitle = true, 
  title = "We work with these insurance providers:",
  size = "md"
}: InsuranceLogosProps) {
  const sizeClasses = {
    sm: "h-8 w-auto",
    md: "h-12 w-auto", 
    lg: "h-16 w-auto"
  };

  const containerClasses = {
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6"
  };

  const insuranceProviders = [
    {
      name: "Moda Health",
      logo: (
        <div className={`${sizeClasses[size]} flex items-center justify-center rounded-lg bg-white px-3 py-2 shadow-sm border border-gray-200`}>
          <span className="text-blue-600 font-bold text-sm">Moda</span>
        </div>
      )
    },
    {
      name: "Regence BlueCross BlueShield",
      logo: (
        <div className={`${sizeClasses[size]} flex items-center justify-center rounded-lg bg-white px-3 py-2 shadow-sm border border-gray-200`}>
          <span className="text-blue-700 font-bold text-xs">Regence BCBS</span>
        </div>
      )
    },
    {
      name: "PacificSource",
      logo: (
        <div className={`${sizeClasses[size]} flex items-center justify-center rounded-lg bg-white px-3 py-2 shadow-sm border border-gray-200`}>
          <span className="text-green-600 font-bold text-sm">PacificSource</span>
        </div>
      )
    },
    {
      name: "Providence Health Plan",
      logo: (
        <div className={`${sizeClasses[size]} flex items-center justify-center rounded-lg bg-white px-3 py-2 shadow-sm border border-gray-200`}>
          <span className="text-purple-600 font-bold text-xs">Providence</span>
        </div>
      )
    },
    {
      name: "Medicare",
      logo: (
        <div className={`${sizeClasses[size]} flex items-center justify-center rounded-lg bg-white px-3 py-2 shadow-sm border border-gray-200`}>
          <span className="text-red-600 font-bold text-sm">Medicare</span>
        </div>
      )
    }
  ];

  return (
    <div className={`${className}`}>
      {showTitle && (
        <p className="text-sm text-app-muted mb-4 text-center">{title}</p>
      )}
      <div className={`flex flex-wrap items-center justify-center ${containerClasses[size]}`}>
        {insuranceProviders.map((provider, index) => (
          <div
            key={provider.name}
            className="flex items-center justify-center"
            title={provider.name}
          >
            {provider.logo}
          </div>
        ))}
      </div>
    </div>
  );
}
