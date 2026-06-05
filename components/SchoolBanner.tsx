"use client";

import Link from "next/link";

export default function SchoolBanner() {
  return (
    <section className="mx-margin-mobile bg-primary-container rounded-2xl p-8 relative overflow-hidden max-w-container-max md:mx-auto">
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-on-primary-container/10 rounded-full blur-3xl"></div>
      <div className="relative z-10 flex flex-col items-start gap-4 max-w-xl">
        <span className="bg-tertiary text-on-tertiary px-3 py-1 rounded-full text-[10px] font-bold">
          BACK TO SCHOOL
        </span>
        <h3 className="font-display-lg-mobile text-white text-3xl font-bold">
          Built for the playground, styled for the classroom.
        </h3>
        <p className="text-on-primary-container/80 font-body-sm">
          Unmatched durability. Pure leather comfort for growing feet.
        </p>
        <Link
          href="/shop?category=school"
          className="bg-white text-primary hover:bg-primary hover:text-white px-6 py-2 rounded-full font-label-uppercase text-label-uppercase mt-2 transition-all shadow-md active:scale-95 text-center"
        >
          Explore School Range
        </Link>
      </div>
    </section>
  );
}
