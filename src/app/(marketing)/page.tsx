import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex-grow bg-background">
      {/* Hero Section */}
      <section className="py-8">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <div className="relative overflow-hidden rounded-xl shadow-lg">
            <div 
              className="flex min-h-[520px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-8 text-center" 
              style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuC6SsSRVlGYy_mYUBPddi5PP0YThIbaZOjDdbxdceDg1Y6UxF6lR23T8POlRObgpuxvvTDIgemtKHSk6ULAH8zMBeYYhFLPPR6xG3JggHWG8qMeJhf9bP7xWgBa02EDitKYJHAnyhB9qcai7rJAG3Gvw5XuoAnrg9DapfZkm0Q7na_aJgu6Cvx-HWuO24YEv4d25UPMK1HQJT_U6VknyixRH1bCSgVgHwpuQZCp6Zh_9LOBd2EzXwdbY784qMeRhQ88skYX-y_rNIUN")' }}
            >
              <div className="flex flex-col gap-4 max-w-2xl">
                <h1 className="text-white text-4xl md:text-6xl font-headline font-bold leading-tight tracking-tight">
                    Rooted in community, grown through care.
                </h1>
                <p className="text-white text-lg md:text-xl font-normal leading-relaxed opacity-90">
                    Empowering our neighbors through dedicated relief efforts and sustainable community support. Join us in making a difference today.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link href="/register" className="flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 bg-primary text-on-primary text-base font-bold shadow-md hover:scale-105 transition-transform">
                  <span className="truncate">Get Involved</span>
                </Link>
                <button className="flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 bg-surface-bright text-primary border border-primary text-base font-bold shadow-md hover:scale-105 transition-transform">
                  <span className="truncate">Learn More</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-12 mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        <div className="flex items-center gap-3 mb-8">
          <span className="material-symbols-outlined text-tertiary">volunteer_activism</span>
          <h2 className="text-on-background text-3xl font-headline font-bold leading-tight">Our Impact</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-4 rounded-xl p-8 bg-surface-container-low border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
              <span className="material-symbols-outlined">restaurant</span>
            </div>
            <div>
              <p className="text-on-surface-variant text-base font-medium mb-1">Meals Served</p>
              <p className="text-primary text-4xl font-headline font-bold">25,000+</p>
            </div>
            <p className="text-on-surface-variant text-sm">Nutritious meals provided to individuals and families facing food insecurity in our local neighborhood.</p>
          </div>
          <div className="flex flex-col gap-4 rounded-xl p-8 bg-surface-container-low border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
              <span className="material-symbols-outlined">family_restroom</span>
            </div>
            <div>
              <p className="text-on-surface-variant text-base font-medium mb-1">Families Supported</p>
              <p className="text-primary text-4xl font-headline font-bold">1,200+</p>
            </div>
            <p className="text-on-surface-variant text-sm">Comprehensive support services ranging from housing assistance to emergency financial relief.</p>
          </div>
          <div className="flex flex-col gap-4 rounded-xl p-8 bg-surface-container-low border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary-fixed-dim flex items-center justify-center text-on-primary-fixed-variant">
              <span className="material-symbols-outlined">groups</span>
            </div>
            <div>
              <p className="text-on-surface-variant text-base font-medium mb-1">Active Volunteers</p>
              <p className="text-primary text-4xl font-headline font-bold">850+</p>
            </div>
            <p className="text-on-surface-variant text-sm">Dedicated community members giving their time and skills to help their neighbors thrive.</p>
          </div>
        </div>
      </section>

      {/* Urgent Needs Section */}
      <section className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        <div className="py-12 bg-surface-container rounded-3xl my-8">
          <div className="flex items-center justify-between px-8 mb-8">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-error">priority_high</span>
              <h2 className="text-on-background text-3xl font-headline font-bold">Urgent Needs</h2>
            </div>
            <Link className="text-primary font-bold text-sm flex items-center gap-1 hover:underline" href="#">
                View all needs <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8">
            {/* Need Card 1 */}
            <div className="bg-surface-bright rounded-xl overflow-hidden shadow-sm border border-outline-variant/20 group">
              <div className="h-48 overflow-hidden relative">
                <img alt="Community food pantry" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2DyHDK4PIljaP1_LoTm0iYljfDNOOXL5UQAoM-ZcvXbXYdBWfVUz-VpDzOTvM5P3jfiqSpAb8A9vv5xvbiZAkgBuMD2iKQB-splYez3yxGPX58Y7h2tY_vBsbRbLEbK5UExPhmQ3qr9JzVo6OU5dUzZn69BuqIMoz0QkJkiatYgRcsfZmEreGJXgYVDxW7PxYydGIwkQaYMj8FRw_tKqxCLr2U7l-yBK7FpyBGi3j6xCU2JIe1iVtiVL9jug0mTQ5wPmB9ma0x9tw" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold rounded-full uppercase tracking-wider">Food Bank</span>
                  <span className="text-error text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span> 2 days left
                  </span>
                </div>
                <h3 className="text-xl font-headline font-bold text-on-background mb-2">Winter Food Stockpile</h3>
                <p className="text-on-surface-variant text-sm mb-4 line-clamp-2">We are running low on non-perishables and fresh protein for our weekly distributions.</p>
                <div className="w-full bg-surface-variant rounded-full h-2 mb-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-on-surface-variant">$15,400 raised</span>
                  <span className="text-xs font-bold text-primary">75% of $20,000</span>
                </div>
                <button className="w-full mt-6 py-3 bg-primary text-on-primary font-bold rounded-lg hover:opacity-90 transition-opacity">Help Fill the Pantry</button>
              </div>
            </div>
            
            {/* Need Card 2 */}
            <div className="bg-surface-bright rounded-xl overflow-hidden shadow-sm border border-outline-variant/20 group">
              <div className="h-48 overflow-hidden relative">
                <img alt="Cozy shelter room" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYszS18UATpB9Zid-0qbeUlL5dDWmUK_pG1SDR-GpkGlvU8Lz-wqEUnJS30PNRcXeKAXqYLBviqDECqfyBzsmfs2uy9ntr_SDPSp0gcbEUrvRwqcu06WLCCC_AgOz4fXV5fd0Lg4zqRTHrDgjvqM_R1lgOg4XIkJNTAASHlMb9I2uX0sJJdsaQCnQuJDXNQ1lMXi0SiuA8Rm47cfUYt_AjgXvVq9g8JZ0ax5hlmr8LHEW9LUzRKcf3SXuGR8xz7dCXhANcz-sl9_Uy" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed text-xs font-bold rounded-full uppercase tracking-wider">Housing</span>
                  <span className="text-error text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">emergency</span> Critical
                  </span>
                </div>
                <h3 className="text-xl font-headline font-bold text-on-background mb-2">Emergency Shelter Beds</h3>
                <p className="text-on-surface-variant text-sm mb-4 line-clamp-2">Providing safe, warm overnight stays for neighbors during the upcoming cold front.</p>
                <div className="w-full bg-surface-variant rounded-full h-2 mb-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-on-surface-variant">$3,200 raised</span>
                  <span className="text-xs font-bold text-primary">40% of $8,000</span>
                </div>
                <button className="w-full mt-6 py-3 bg-primary text-on-primary font-bold rounded-lg hover:opacity-90 transition-opacity">Provide Shelter</button>
              </div>
            </div>
            
            {/* Need Card 3 */}
            <div className="bg-surface-bright rounded-xl overflow-hidden shadow-sm border border-outline-variant/20 group">
              <div className="h-48 overflow-hidden relative">
                <img alt="Students learning" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB59GT3-vcQZBAHjD6uYEZ0YCXvr9iucOAJ7EowMxLN2NoNWC04h9w-L1jykbUWlT0hdsElaLZ-oKUa9LmC_4bcG9L8U9IYJWnvFr-SEoedtSLfbZaqfIX2vd3RuA9cM31SLSEJduBDdGemepa4srGqRfHqF7WloY2f6buH0Ftd2OFnz9OnQZmzprgDW3pQHSJD8gh2wY26Rlhx32xMNWYRUECOumf07rix0bPPFn67AKQX4x-eZXjAOfl8a6Td00fRS3dNj8kYNWs2" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="px-3 py-1 bg-on-secondary-container/10 text-on-secondary-container text-xs font-bold rounded-full uppercase tracking-wider">Education</span>
                  <span className="text-on-surface-variant text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">event</span> Monthly
                  </span>
                </div>
                <h3 className="text-xl font-headline font-bold text-on-background mb-2">After-School Tutoring</h3>
                <p className="text-on-surface-variant text-sm mb-4 line-clamp-2">Funding supplies and volunteer coordinators for our daily literacy program.</p>
                <div className="w-full bg-surface-variant rounded-full h-2 mb-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-on-surface-variant">$4,500 raised</span>
                  <span className="text-xs font-bold text-primary">90% of $5,000</span>
                </div>
                <button className="w-full mt-6 py-3 bg-primary text-on-primary font-bold rounded-lg hover:opacity-90 transition-opacity">Support Students</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to Help Section */}
      <section className="py-12 mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        <div className="text-center mb-12">
          <h2 className="text-on-background text-4xl font-headline font-bold mb-4">Ways to Help</h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">Whether you have time, resources, or skills to share, every contribution helps our community grow stronger.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Volunteer Option */}
          <div className="flex flex-col md:flex-row gap-6 p-8 bg-surface-bright rounded-2xl border border-outline-variant/30 shadow-sm items-center">
            <div className="w-24 h-24 shrink-0 rounded-2xl bg-primary-container/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-5xl">pan_tool</span>
            </div>
            <div>
              <h3 className="text-2xl font-headline font-bold text-on-background mb-2">Volunteer Your Time</h3>
              <p className="text-on-surface-variant mb-6">Join our team of over 800 active volunteers. From sorting food to teaching classes, we have a place for you.</p>
              <Link className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all" href="/register">
                Browse Opportunities <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
          
          {/* Donate Option */}
          <div className="flex flex-col md:flex-row gap-6 p-8 bg-surface-bright rounded-2xl border border-outline-variant/30 shadow-sm items-center">
            <div className="w-24 h-24 shrink-0 rounded-2xl bg-tertiary-fixed/30 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-5xl">volunteer_activism</span>
            </div>
            <div>
              <h3 className="text-2xl font-headline font-bold text-on-background mb-2">One-Time or Monthly Giving</h3>
              <p className="text-on-surface-variant mb-6">Your financial support directly funds our relief programs. $50 can provide 10 hot meals for local families.</p>
              <button className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                Start Your Donation <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        <div className="bg-primary rounded-3xl p-12 text-center text-on-primary shadow-xl">
          <h2 className="text-3xl md:text-5xl font-headline font-bold mb-6">Ready to make a difference?</h2>
          <p className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto">Our doors are always open, and our community is waiting for you. Together, we can build a more resilient neighborhood.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register" className="h-14 px-10 bg-surface-bright text-primary font-bold rounded-xl shadow-lg hover:bg-white transition-colors flex items-center justify-center">Apply to Volunteer</Link>
            <button className="h-14 px-10 bg-on-primary-fixed-variant border border-primary-fixed/30 text-white font-bold rounded-xl shadow-lg hover:bg-primary-fixed-dim/20 transition-colors">Donate Goods</button>
          </div>
        </div>
      </section>
    </div>
  );
}
