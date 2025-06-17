import React, { useState, useEffect } from "react";

/**
 * AgeCalculator Component
 * - Accessible, responsive, styled with CSS Grid/Flexbox
 * - Includes aria attributes for accessibility
 * - Demonstrates async API call (to worldtimeapi.org for UTC time, simulating SSR/REST)
 * - Example SSR compatibility (can be rendered statically)
 * - PWA-ready (no direct service worker here, but compatible)
 * - Follows OWASP best practices (no unsafe HTML, proper input handling)
 */
const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [utcDate, setUtcDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Async API call for current UTC date (simulates SSR/REST usage)
  useEffect(() => {
    setLoading(true);
    fetch("https://worldtimeapi.org/api/timezone/Etc/UTC")
      .then((res) => res.json())
      .then((data) => {
        setUtcDate(new Date(data.utc_datetime));
        setLoading(false);
      })
      .catch(() => {
        setUtcDate(new Date());
        setLoading(false);
      });
  }, []);

  const calculateAge = (dateString: string, now: Date) => {
    if (!dateString || !now) {
      setAge("");
      return;
    }
    const birth = new Date(dateString);
    let years = now.getUTCFullYear() - birth.getUTCFullYear();
    let months = now.getUTCMonth() - birth.getUTCMonth();
    let days = now.getUTCDate() - birth.getUTCDate();

    if (days < 0) {
      months--;
      days += new Date(now.getUTCFullYear(), now.getUTCMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    setAge(
      `${years} year${years !== 1 ? "s" : ""}, ${months} month${months !== 1 ? "s" : ""}, and ${days} day${days !== 1 ? "s" : ""}`
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(e.target.value);
    if (utcDate) calculateAge(e.target.value, utcDate);
  };

  // SSR/Accessibility: label htmlFor, aria-live for dynamic output
  return (
    <section className="age-calculator" aria-labelledby="age-calc-title">
      <h2 id="age-calc-title">Age Calculator</h2>
      <form className="age-form" autoComplete="off">
        <label htmlFor="birthdate">Enter your birth date:</label>
        <input
          type="date"
          id="birthdate"
          name="birthdate"
          value={birthDate}
          onChange={handleChange}
          aria-required="true"
        />
      </form>
      <div className="age-result" aria-live="polite">
        {loading
          ? "Loading current time..."
          : age
          ? `Your age is: ${age}`
          : "Enter your birth date to calculate age."}
      </div>
      <div className="meta-info">
        <span role="img" aria-label="UTC Time">
          🌐
        </span>
        {utcDate && (
          <time dateTime={utcDate.toISOString()}>
            Current UTC Time: {utcDate.toUTCString()}
          </time>
        )}
      </div>
    </section>
  );
};

export default AgeCalculator;