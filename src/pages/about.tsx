// src/pages/about.tsx
import React from "react";

const About = () => {
  return (
    <div className="flex flex-col p-4 mt-16">
      <h1 className="text-3xl font-bold text-green-600 mb-4">About PrayCalc</h1>

      {/* Introduction Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Introduction to PrayCalc</h2>
        <p className="text-md mb-3">
          Welcome to PrayCalc, a groundbreaking initiative dedicated to the precise calculation of Islamic prayer times. At PrayCalc, we harness the synergy of advanced astronomical algorithms and deep-rooted Islamic traditions to provide meticulously accurate prayer schedules. Our platform embodies the integration of scientific rigor with spiritual devotion, aiming to enhance the daily worship experience of Muslims around the globe.

          The journey of PrayCalc began with a vision to address the challenges faced by the Muslim community in accurately determining prayer times, especially in regions with significant variations in daylight hours. Leveraging cutting-edge technology, PrayCalc offers an innovative solution that respects the sanctity of Islamic practices while embracing the advancements of modern astronomy and computational methods.

          Our system intricately blends astronomical observations with Islamic jurisprudence, ensuring that the calculated prayer times not only adhere to scientific precision but also align with the spiritual essence of Islamic worship. By striking this balance, PrayCalc stands as a beacon of innovation in the realm of religious observance, providing a reliable and user-friendly platform for Muslims worldwide.
        </p>
      </section>

      {/* Principles of Islamic Prayer Times */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Principles of Islamic Prayer Times</h2>
        <p className="text-md mb-3">
          The calculation of Islamic prayer times is a discipline that combines astronomical observations with theological principles. Historically, these times were determined by observing the sun&apos;s position in the sky. However, with advancements in science and technology, this practice has evolved into a precise mathematical process.

          The five daily prayers in Islam - Fajr, Dhuhr, Asr, Maghrib, and Isha - are each tied to specific positions of the sun. Fajr is observed before sunrise when the morning light first appears on the horizon. Dhuhr is performed when the sun reaches its zenith. Asr is timed based on the length of an object&apos;s shadow, Maghrib is at sunset, and Isha begins when the sky darkens completely.

          These prayer times reflect a profound connection between the daily rhythms of the natural world and the spiritual practices of Muslims. By adhering to these times, Muslims demonstrate their commitment to a life organized around their faith and its alignment with the cosmos.

          In modern times, the calculation of these prayer times is no longer just an observational practice but has transformed into a sophisticated scientific endeavor. This involves using complex algorithms to calculate the sun&apos;s position with precision, accounting for factors like geographical location, time zone differences, and seasonal variations in daylight hours.
        </p>
      </section>

      {/* NREL SPA: Core of Our Calculations */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">NREL SPA: Core of Our Calculations</h2>
        <p className="text-md mb-3">
          A pivotal advancement in PrayCalc&apos;s journey has been the introduction of the National Renewable Energy Laboratory&apos;s Solar Position Algorithm (NREL SPA) within our computational framework. This integration is a leap forward in the realm of Islamic prayer time calculation, as the SPA algorithm is a masterstroke of astronomical precision, facilitating the exact calculation of solar positions—zenith and azimuth angles—critical for determining accurate prayer times.

          The SPA algorithm ingeniously melds astronomical data with mathematical acumen. It incorporates vital factors such as the Earth&apos;s axial tilt, its orbital eccentricities, and precession, as well as the observer&apos;s geographical coordinates (latitude and longitude) and elevation. This level of detail ensures that PrayCalc can offer precise prayer times, finely attuned to the diverse geographical conditions of its users globally.

          A fundamental aspect of the SPA is the computation of the solar declination, a key determinant in solar positioning. The solar declination, denoted by δ (delta), is the angular distance between the rays of the sun and the Earth&apos;s equatorial plane, varying throughout the year owing to the Earth&apos;s orbit around the sun.
        </p>

        <p className="text-md mb-3 text-center" style={{ color: 'navy', fontSize: 'larger', fontFamily: 'Consolas, "Courier New", monospace' }}>
          δ = 23.45° × sin((360/365) × (N + 10))
        </p>

        <p className="text-md mb-3">
          The formula highlighted above is a testament to the Earth&apos;s axial tilt and its influence on solar exposure across different seasons. The term 23.45° represents the Earth&apos;s maximum axial tilt, while the sine function modulates this tilt based on the day of the year (N), reflecting the Earth&apos;s elliptical orbit around the sun and the consequent variation in solar declination.

          Historically, the NREL SPA was available primarily in its original C programming language format on the NREL&apos;s website. Recognizing the algorithm&apos;s unparalleled precision but its limited accessibility in modern web development environments, our team took the initiative to transcribe this powerful tool into JavaScript. We created the npm package <a href="https://www.npmjs.com/package/nrel-spa" target="_blank">nrel-spa</a>. This significant endeavor has made the SPA algorithm readily accessible and integrable into a wider array of applications, including PrayCalc, marking us as pioneers in leveraging this advanced solar calculation tool within the JavaScript ecosystem.
        </p>

        <p className="text-md mb-3">
          A defining feature of the NREL SPA, which underscores its superiority, is its remarkable accuracy in calculating solar angles. The SPA boasts an error margin of merely ±0.0003 degrees under standard atmospheric conditions, a level of precision that is virtually unparalleled in solar position algorithms. This minuscule error margin ensures that the calculation of prayer times is not just accurate but also consistent, regardless of the observer&apos;s global position. 

          In contrast, other solar position algorithms often present larger error margins, which can lead to significant inaccuracies in prayer time calculation, especially in regions with extreme geographical features or at higher latitudes. For instance, some algorithms may have error margins that exceed several minutes in solar time, translating to noticeable deviations in prayer schedules. Such discrepancies, while seemingly minor, can impact the observance of prayers, particularly Fajr and Maghrib, which are closely tied to the sun&apos;s position relative to the horizon. PrayCalc&apos;s adoption of the NREL SPA mitigates these risks, providing users with the assurance of precision and fidelity to Islamic tenets in their prayer practices.
        </p>

        <p className="text-md mb-3">
          When compared to other leading solar position algorithms, the NREL SPA stands out for its meticulous accuracy and comprehensive approach. It surpasses its counterparts by not only considering basic geographical and temporal factors but also integrating complex celestial mechanics. This results in a level of precision that is crucial for Islamic prayer time calculation, where even minute discrepancies can lead to significant deviations from the prescribed times. The SPA&apos;s robustness against various environmental conditions and its adaptability to different geographical settings make it the superior choice for our application.

          Our initiative to make the SPA available in JavaScript and its subsequent integration into PrayCalc is more than a technological feat; it is a commitment to enhancing the spiritual lives of Muslims worldwide. By offering a tool that harmonizes celestial precision with religious practice, we empower our users to observe their prayers at times that are not only scientifically accurate but also spiritually resonant.
        </p>
      </section>

      {/* Atmospheric Refraction: A Critical Factor */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Atmospheric Refraction: A Critical Factor</h2>
        <p className="text-md mb-3">
          A significant aspect of accurate prayer time calculation in PrayCalc is the consideration of atmospheric refraction. This phenomenon, while often overlooked, plays a crucial role in the precise determination of solar positions, especially at critical times like sunrise and sunset.

          Atmospheric refraction refers to the bending of light as it passes through the Earth&apos;s atmosphere. Due to variations in air density, the light from the sun is refracted, causing the sun to appear slightly higher in the sky than its actual position. This effect is most pronounced at lower angles, making it particularly relevant for the calculation of Fajr (pre-dawn) and Maghrib (dusk) prayers.
        </p>

        <p className="text-md mb-3 text-center" style={{ color: 'navy', fontSize: 'larger', fontFamily: 'Consolas, "Courier New", monospace' }}>
          R = 1.02 / tan(θ + 10.3/(θ + 5.11))
        </p>

        <p className="text-md mb-3">
          The formula above illustrates the calculation of atmospheric refraction, R, where θ is the apparent altitude of the celestial body (in this case, the sun) above the horizon. This formula helps to correct the apparent position of the sun by accounting for the bending of its light as it traverses the Earth&apos;s atmosphere. The tangent function tan(θ) is critical in determining the degree of refraction based on the sun&apos;s altitude.

          In the context of prayer times, understanding and applying atmospheric refraction is vital. For instance, the Fajr prayer is observed when the sun is a specific angle below the horizon, a calculation intricately tied to the refracted position of the sun. Similarly, the timing for Maghrib is affected by refraction, as it marks the moment post-sunset when the refracted sun finally dips below the horizon.
        </p>

        <p className="text-md mb-3">
          PrayCalc&apos;s algorithm incorporates this atmospheric refraction factor, ensuring that the calculated prayer times are not just astronomically precise but also practically relevant. This consideration is especially important in locations with unique atmospheric conditions, such as high altitudes or extreme latitudes, where refraction can have a more pronounced effect. By meticulously adjusting for atmospheric refraction, PrayCalc upholds its commitment to providing the most accurate and reliable prayer times possible, harmonizing celestial observations with Islamic jurisprudence.
        </p>
      </section>

      {/* Elevation Influence on Prayer Times */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Elevation Influence on Prayer Times</h2>
        <p className="text-md mb-3">
          In the realm of precise Islamic prayer time calculation, the impact of elevation is a factor of considerable importance, meticulously incorporated into PrayCalc&apos;s algorithm. The elevation of a location directly influences how celestial bodies, particularly the sun, are observed, thus affecting the timing of prayers.

          With increasing elevation, the atmosphere becomes less dense, leading to a reduced effect of atmospheric refraction. This change results in a perceptible alteration in the apparent position of the sun at critical moments like sunrise and sunset. As a consequence, in higher altitude areas, the times for Fajr and Maghrib prayers—both dependent on the sun&apos;s position relative to the horizon—shift slightly earlier and later, respectively, in comparison to observations made at sea level.
        </p>

        <p className="text-center mb-3" style={{ color: 'navy', fontSize: 'larger', fontFamily: 'Consolas, "Courier New", monospace' }}>
          Δt = (2π/365.24) × (Elevation / 6371000)
        </p>

        <p className="text-md mb-3">
          The formula displayed above calculates the time adjustment, Δt, due to elevation. In this equation, Δt is the alteration in time (measured in days), and Elevation is the observer&apos;s height above sea level in meters. The formula incorporates the Earth&apos;s average radius, approximately 6,371 kilometers, to derive the necessary adjustment in prayer times resulting from changes in elevation.

          This means that with every increase in elevation, there is a corresponding and necessary recalibration of the calculated prayer times. This adjustment becomes especially relevant in mountainous regions or cities situated at higher altitudes. PrayCalc meticulously factors in this elevation element, ensuring that the provided prayer times are not only astronomically accurate but also geographically specific, catering to the distinct topographical features of each user&apos;s location.
        </p>

        <p className="text-md mb-3">
          By integrating elevation data into its calculations, PrayCalc demonstrates its commitment to offering a prayer time calculation service that is both scientifically sound and religiously resonant. This attention to topographical detail allows for a more personalized and precise prayer schedule, enhancing the congruence between the physical world and spiritual observance.
        </p>
      </section>

      {/* Earth's Orbit and the Equation of Time */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Earth&apos;s Orbit and the Equation of Time</h2>
        <p className="text-md mb-3">
          PrayCalc&apos;s approach to calculating Islamic prayer times incorporates a profound understanding of Earth&apos;s orbital dynamics, particularly the Equation of Time (EOT). This concept is crucial in understanding the apparent motion of the sun and, consequently, in determining accurate prayer times.

          The Equation of Time is a measure of the discrepancy between time as read from a sundial (apparent solar time) and a clock (mean solar time). This discrepancy arises due to the eccentricity of the Earth&apos;s orbit and the axial tilt. These factors cause the solar day to vary in length throughout the year.
        </p>

        <p className="text-center" style={{ color: 'navy', fontSize: 'larger', fontFamily: 'Consolas, "Courier New", monospace' }}>
          EOT = 9.87 × sin(2B) - 7.53 × cos(B) - 1.5 × sin(B)
        </p>

        <p className="text-md mb-3">
          In the formula above, EOT is the Equation of Time, and B is a factor related to the Earth&apos;s orbital characteristics, calculated as B = 360° × (N - 81) / 365, where N is the day of the year. This equation accounts for the cumulative effect of the Earth&apos;s elliptical orbit and its axial tilt on the apparent position of the sun. As a result, the solar noon, the time when the sun is at its highest point in the sky, can vary from the clock noon by as much as ±16 minutes throughout the year.

          Understanding and accurately calculating the Equation of Time is pivotal for PrayCalc. It allows for the adjustment of prayer times, ensuring they align with the true solar position rather than a fixed clock time. This distinction is especially crucial for the Dhuhr prayer, which is directly tied to the sun&apos;s zenith.
        </p>

        <p className="text-md mb-3">
          By incorporating the EOT into our calculations, PrayCalc not only embraces the complexity of celestial mechanics but also ensures that the prayer times reflect a true synchronization with the solar cycle. This commitment to astronomical accuracy in the calculation of Islamic prayer times highlights the intersection of faith, science, and technology, which is the cornerstone of PrayCalc&apos;s philosophy.
        </p>
      </section>

      {/* Calculating Each Prayer Time: A Scientific Approach */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Calculating Each Prayer Time: A Scientific Approach</h2>
        <p className="text-md mb-3">{"<Calculating_Each_Prayer_Time_Content_Here>"}</p>
      </section>

      {/* Islamic Calendar and Lunar Cycle Considerations */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Islamic Calendar and Lunar Cycle Considerations</h2>
        <p className="text-md mb-3">{"<Islamic_Calendar_Lunar_Cycle_Content_Here>"}</p>
      </section>

      {/* Technological Framework and Open Source Ecosystem */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Technological Framework and Open Source Ecosystem</h2>
        <p className="text-md mb-3">{"<Technological_Framework_Open_Source_Ecosystem_Content_Here>"}</p>
      </section>

      {/* Challenges and Future Endeavors */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Challenges and Future Endeavors</h2>
        <p className="text-md mb-3">{"<Challenges_Future_Endeavors_Content_Here>"}</p>
      </section>

      {/* Conclusion */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Conclusion</h2>
        <p className="text-md mb-3">{"<Conclusion_Content_Here>"}</p>
      </section>
    </div>
  );
};

export default About;
