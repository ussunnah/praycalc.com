// src/pages/contact.tsx
import React from 'react';

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 mt-16">
      <h1 className="text-3xl font-bold text-green-600 mb-8">Contact Us</h1>

      <section className="max-w-2xl text-center mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Contributions Matter</h2>
        <p className="text-md mb-6">
          At PrayCalc, we strive for accuracy in prayer times calculation. Your eye-verified 
          sightings are invaluable to us. They help us refine our algorithms and enhance 
          the precision of our prayer time predictions.
        </p>
        <p className="text-md mb-6">
          If you observe discrepancies in prayer times, we encourage you to report them. 
          Your feedback is crucial for our ongoing research and development.
        </p>

        <a 
          href="https://forms.gle/iYLh79xmXCTgLacY8" 
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300"
        >
          Submit Your Sighting
        </a>
      </section>
    </div>
  );
};

export default Contact;
