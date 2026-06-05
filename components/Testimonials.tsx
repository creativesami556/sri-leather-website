"use client";

export default function Testimonials() {
  const testimonials = [
    {
      stars: 5,
      text: "The quality of leather is unmatched. I've been a loyal customer for 5 years and my first pair still looks brand new.",
      author: "Rajesh K., Hyderabad",
    },
    {
      stars: 5,
      text: "Best school shoes in town. They survive the daily playground grind without a single scratch. Highly recommended!",
      author: "Sumathi V., Ashok Nagar",
    },
  ];

  return (
    <section className="py-12 bg-surface-container-low w-full">
      <div className="max-w-container-max mx-auto">
        <div className="px-margin-mobile mb-8">
          <h3 className="font-headline-sm text-headline-sm text-primary">
            What Our Customers Say
          </h3>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-margin-mobile pb-4">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="min-w-[280px] md:min-w-[400px] flex-1 bg-surface p-6 rounded-2xl premium-shadow"
            >
              <div className="flex text-tertiary mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="italic font-body-md text-on-surface-variant mb-4">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="font-label-uppercase text-label-uppercase text-primary font-semibold">
                — {t.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
