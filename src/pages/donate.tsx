// src/pages/donate.tsx
import React from 'react';

const Donate = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 mt-16">
      <h1 className="text-3xl font-bold text-green-600 mb-8">Donate to PrayCalc</h1>

      <section className="max-w-2xl text-center mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Support Matters</h2>
        <p className="text-md mb-6">
          Thank you for considering support for PrayCalc. Currently, we are not accepting donations, 
          but we are excited about our future initiatives.
        </p>
        <p className="text-md mb-6">
          We are planning to launch PrayCalc Premium, which will integrate with popular smart home 
          devices like Google Home and Amazon Alexa. This upgrade will bring enhanced features and 
          convenience to your prayer time calculations and reminders.
        </p>
        <p className="text-md mb-6">
          Additionally, we are looking forward to supporting our parent dawah organization through 
          future donations. More details on this will be available as we launch these initiatives.
        </p>
        <p className="text-md">
          Stay tuned for updates and thank you for your interest in supporting PrayCalc and our 
          broader mission.
        </p>
      </section>
    </div>
  );
};

export default Donate;
