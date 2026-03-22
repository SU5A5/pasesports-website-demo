import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, Check, Loader2 } from 'lucide-react';

const today = new Date().toISOString().split('T')[0];

const formSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^\+91[0-9]{10}$/, 'Enter a valid Indian number (e.g. +919880871212)'),
  organization: z.string().optional(),

  serviceType: z.enum(['Court Booking', 'Training Program', 'Tournament Hosting']),
  sport: z.string().min(1, 'Please select a sport'),
  facilityType: z.string().min(1, 'Please select a facility type'),
  days: z.number().min(1, 'Must be at least 1 day'),
  hoursPerDay: z.number().min(1, 'Must be at least 1 hour').max(24, 'Max 24 hours per day'),
  startDate: z.string().min(1, 'Please select a start date'),
  participants: z.number().min(1, 'Must be at least 1 participant'),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const SPORTS_OPTIONS = {
  'Court Booking': ['Badminton', 'Pickleball', 'Tennis', 'Football', 'Cricket'],
  'Training Program': ['Badminton', 'Tennis', 'Football', 'Cricket'],
  'Tournament Hosting': ['Badminton', 'Pickleball', 'Tennis', 'Football', 'Cricket'],
};

const FACILITY_OPTIONS = {
  'Badminton': ['Wooden Hall', 'Synthetic Court'],
  'Pickleball': ['Hard Court', 'Indoor Court'],
  'Tennis': ['Hard Court', 'Clay Court'],
  'Football': ['AstroTurf', 'Natural Grass'],
  'Cricket': ['Turf Wicket', 'Cement Wicket'],
};

const BASE_RATES = {
  'Badminton': 500,
  'Pickleball': 600,
  'Tennis': 800,
  'Football': 1500,
  'Cricket': 2000,
};

export default function GetQuote() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, watch, reset, formState: { errors }, trigger } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      serviceType: 'Court Booking',
      days: 1,
      hoursPerDay: 2,
      participants: 4,
    }
  });

  const watchServiceType = watch('serviceType');
  const watchSport = watch('sport');
  const watchDays = watch('days');
  const watchHours = watch('hoursPerDay');

  const calculateEstimate = () => {
    if (!watchSport || !watchDays || !watchHours) return null;
    const baseRate = BASE_RATES[watchSport as keyof typeof BASE_RATES] || 1000;
    const totalHours = watchDays * watchHours;
    const minEstimate = baseRate * totalHours;
    const maxEstimate = minEstimate * 1.2;
    return { min: minEstimate, max: maxEstimate };
  };

  const estimate = calculateEstimate();

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    if (step === 1) fieldsToValidate = ['fullName', 'phone'];
    if (step === 2) fieldsToValidate = ['serviceType', 'sport', 'facilityType', 'days', 'hoursPerDay', 'startDate', 'participants'];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const message = `New Quote Request — Pase Sports
Name: ${data.fullName}
Phone: ${data.phone}
Service: ${data.serviceType}
Sport: ${data.sport}
Facility: ${data.facilityType}
Days: ${data.days} | Hours/Day: ${data.hoursPerDay}
Start Date: ${data.startDate}
Participants: ${data.participants}
Estimate: Rs.${estimate?.min.toLocaleString()} - Rs.${estimate?.max.toLocaleString()}
Notes: ${data.notes || 'None'}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919880871212?text=${encodedMessage}`, '_blank');

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const inputClass = (field: keyof FormData) =>
    `w-full bg-void border ${errors[field] ? 'border-error focus:border-error' : 'border-border focus:border-accent'} rounded-md px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all`;

  const selectClass = (field: keyof FormData, disabled = false) =>
    `w-full bg-void border ${errors[field] ? 'border-error focus:border-error' : 'border-border focus:border-accent'} rounded-md px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all appearance-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  return (
    <div className="bg-void text-text-primary min-h-screen pt-32 pb-24">
      {/* Page Hero */}
      <section className="max-w-3xl mx-auto px-6 mb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-5xl md:text-[64px] leading-[0.9] tracking-[-0.02em] mb-6"
        >
          Plan Your<br />Experience.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-text-secondary"
        >
          Tell us what you need. We'll tell you exactly what it costs.
        </motion.p>
      </section>

      {/* Multi-step Form */}
      <section className="max-w-2xl mx-auto px-4 md:px-6">
        {/* Progress Bar */}
        <div className="mb-12 relative">
          <div className="flex justify-between relative z-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step > i ? 'bg-primary text-text-primary' :
                  step === i ? 'bg-accent text-text-primary shadow-[0_0_15px_rgba(58,123,213,0.5)]' :
                  'bg-surface border border-border text-text-muted'
                }`}>
                  {step > i ? <Check size={16} /> : <span className="font-mono text-xs">{i}</span>}
                </div>
                <span className={`font-mono text-[10px] uppercase tracking-widest ${step >= i ? 'text-bright' : 'text-text-muted'}`}>
                  {i === 1 ? 'About You' : i === 2 ? 'Requirements' : 'Review'}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute top-4 left-4 right-4 h-0.5 bg-border -z-0">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: '0%' }}
              animate={{ width: `${((step - 1) / 2) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-surface border border-border rounded-2xl p-6 md:p-10 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form
                key={step}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* STEP 1: ABOUT YOU */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="font-display text-3xl mb-8">About You</h2>

                    <div>
                      <label htmlFor="fullName" className="block font-mono text-[11px] uppercase tracking-[0.3em] text-text-secondary mb-2">Full Name</label>
                      <input
                        id="fullName"
                        {...register('fullName')}
                        aria-invalid={!!errors.fullName}
                        className={inputClass('fullName')}
                        placeholder="John Doe"
                      />
                      {errors.fullName && <p className="text-error text-xs mt-2" role="alert">{errors.fullName.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block font-mono text-[11px] uppercase tracking-[0.3em] text-text-secondary mb-2">Phone Number</label>
                      <input
                        id="phone"
                        {...register('phone')}
                        aria-invalid={!!errors.phone}
                        className={inputClass('phone')}
                        placeholder="+919880871212"
                      />
                      {errors.phone && <p className="text-error text-xs mt-2" role="alert">{errors.phone.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="organization" className="block font-mono text-[11px] uppercase tracking-[0.3em] text-text-secondary mb-2">Organisation/Team (Optional)</label>
                      <input
                        id="organization"
                        {...register('organization')}
                        className="w-full bg-void border border-border focus:border-accent rounded-md px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                        placeholder="Company Name or Team Name"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 2: REQUIREMENTS */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="font-display text-3xl mb-8">Your Requirements</h2>

                    <div>
                      <label htmlFor="serviceType" className="block font-mono text-[11px] uppercase tracking-[0.3em] text-text-secondary mb-2">Service Type</label>
                      <select
                        id="serviceType"
                        {...register('serviceType')}
                        className={selectClass('serviceType')}
                      >
                        <option value="Court Booking">Court Booking</option>
                        <option value="Training Program">Training Program</option>
                        <option value="Tournament Hosting">Tournament Hosting</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="sport" className="block font-mono text-[11px] uppercase tracking-[0.3em] text-text-secondary mb-2">Sport</label>
                        <select
                          id="sport"
                          {...register('sport')}
                          aria-invalid={!!errors.sport}
                          className={selectClass('sport')}
                        >
                          <option value="">Select Sport</option>
                          {SPORTS_OPTIONS[watchServiceType as keyof typeof SPORTS_OPTIONS]?.map(sport => (
                            <option key={sport} value={sport}>{sport}</option>
                          ))}
                        </select>
                        {errors.sport && <p className="text-error text-xs mt-2" role="alert">{errors.sport.message}</p>}
                      </div>

                      <div>
                        <label htmlFor="facilityType" className="block font-mono text-[11px] uppercase tracking-[0.3em] text-text-secondary mb-2">Facility Type</label>
                        <select
                          id="facilityType"
                          {...register('facilityType')}
                          aria-invalid={!!errors.facilityType}
                          className={selectClass('facilityType', !watchSport)}
                          disabled={!watchSport}
                        >
                          <option value="">{watchSport ? 'Select Facility' : 'Select a sport first'}</option>
                          {watchSport && FACILITY_OPTIONS[watchSport as keyof typeof FACILITY_OPTIONS]?.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                        {errors.facilityType && <p className="text-error text-xs mt-2" role="alert">{errors.facilityType.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="days" className="block font-mono text-[11px] uppercase tracking-[0.3em] text-text-secondary mb-2">Number of Days</label>
                        <input
                          id="days"
                          type="number"
                          min={1}
                          {...register('days', { valueAsNumber: true })}
                          aria-invalid={!!errors.days}
                          className={inputClass('days')}
                        />
                        {errors.days && <p className="text-error text-xs mt-2" role="alert">{errors.days.message}</p>}
                      </div>

                      <div>
                        <label htmlFor="hoursPerDay" className="block font-mono text-[11px] uppercase tracking-[0.3em] text-text-secondary mb-2">Hours Per Day</label>
                        <input
                          id="hoursPerDay"
                          type="number"
                          min={1}
                          max={24}
                          {...register('hoursPerDay', { valueAsNumber: true })}
                          aria-invalid={!!errors.hoursPerDay}
                          className={inputClass('hoursPerDay')}
                        />
                        {errors.hoursPerDay && <p className="text-error text-xs mt-2" role="alert">{errors.hoursPerDay.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="startDate" className="block font-mono text-[11px] uppercase tracking-[0.3em] text-text-secondary mb-2">Preferred Start Date</label>
                        <input
                          id="startDate"
                          type="date"
                          min={today}
                          {...register('startDate')}
                          aria-invalid={!!errors.startDate}
                          className={inputClass('startDate')}
                        />
                        {errors.startDate && <p className="text-error text-xs mt-2" role="alert">{errors.startDate.message}</p>}
                      </div>

                      <div>
                        <label htmlFor="participants" className="block font-mono text-[11px] uppercase tracking-[0.3em] text-text-secondary mb-2">Participants</label>
                        <input
                          id="participants"
                          type="number"
                          min={1}
                          {...register('participants', { valueAsNumber: true })}
                          aria-invalid={!!errors.participants}
                          className={inputClass('participants')}
                        />
                        {errors.participants && <p className="text-error text-xs mt-2" role="alert">{errors.participants.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="notes" className="block font-mono text-[11px] uppercase tracking-[0.3em] text-text-secondary mb-2">Additional Notes</label>
                      <textarea
                        id="notes"
                        {...register('notes')}
                        rows={3}
                        className="w-full bg-void border border-border focus:border-accent rounded-md px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all resize-none"
                        placeholder="Any specific requirements?"
                      />
                    </div>

                    {estimate && (
                      <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bright block mb-1">Live Estimate</span>
                        <span className="font-display text-2xl text-text-primary">
                          {'\u20B9'}{estimate.min.toLocaleString()} – {'\u20B9'}{estimate.max.toLocaleString()}
                        </span>
                        <p className="text-[10px] text-text-muted mt-1">Includes 20% buffer for peak hours</p>
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 3: REVIEW */}
                {step === 3 && (
                  <div className="space-y-8">
                    <h2 className="font-display text-3xl mb-8">Review & Submit</h2>

                    <div className="bg-void border border-border rounded-xl p-6 space-y-4">
                      <div className="flex justify-between border-b border-border pb-4">
                        <span className="text-text-secondary text-sm">Service</span>
                        <span className="font-bold text-text-primary">{watchServiceType}</span>
                      </div>
                      <div className="flex justify-between border-b border-border pb-4">
                        <span className="text-text-secondary text-sm">Sport & Facility</span>
                        <span className="font-bold text-text-primary">{watchSport} · {watch('facilityType')}</span>
                      </div>
                      <div className="flex justify-between border-b border-border pb-4">
                        <span className="text-text-secondary text-sm">Duration</span>
                        <span className="font-bold text-text-primary">{watchDays} Days × {watchHours} Hrs/Day</span>
                      </div>
                      <div className="flex justify-between border-b border-border pb-4">
                        <span className="text-text-secondary text-sm">Start Date</span>
                        <span className="font-bold text-text-primary">{watch('startDate')}</span>
                      </div>
                      <div className="flex justify-between pt-2">
                        <span className="text-text-secondary text-sm">Participants</span>
                        <span className="font-bold text-text-primary">{watch('participants')} People</span>
                      </div>
                    </div>

                    {estimate && (
                      <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
                        <span className="relative z-10 font-mono text-[11px] uppercase tracking-[0.3em] text-bright mb-2 block">Estimated Quote Range</span>
                        <span className="relative z-10 font-display text-4xl text-text-primary">
                          {'\u20B9'}{estimate.min.toLocaleString()} – {'\u20B9'}{estimate.max.toLocaleString()}
                        </span>
                        <p className="relative z-10 text-xs text-text-secondary mt-2">Final quote may vary based on specific requirements and availability.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Form Navigation */}
                <div className="flex justify-between pt-8 border-t border-border mt-8">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 rounded-md bg-transparent text-bright border border-border hover:bg-surface-raised hover:text-text-primary transition-all font-bold text-sm flex items-center gap-2"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                  ) : <div />}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 rounded-md bg-primary text-text-primary border border-accent hover:bg-accent transition-all shadow-[0_0_15px_rgba(58,123,213,0.2)] font-bold text-sm flex items-center gap-2"
                    >
                      Next Step <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 rounded-md bg-primary text-text-primary border border-accent hover:bg-accent transition-all shadow-[0_0_20px_rgba(58,123,213,0.3)] hover:shadow-[0_0_40px_rgba(58,123,213,0.5)] font-bold text-sm flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : 'Submit via WhatsApp'}
                    </button>
                  )}
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-success/20 border border-success flex items-center justify-center mx-auto mb-8 text-success shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                  <Check size={40} />
                </div>
                <h2 className="font-display text-5xl mb-4">Quote Sent!</h2>
                <p className="text-text-secondary mb-8 max-w-md mx-auto">
                  Our team has received your request and will contact you via WhatsApp within 2 hours with a finalized quote.
                </p>
                <button
                  onClick={() => {
                    reset();
                    setIsSuccess(false);
                    setStep(1);
                  }}
                  className="px-6 py-3 rounded-md bg-transparent text-bright border border-primary hover:bg-primary/15 hover:border-accent hover:text-text-primary transition-all font-bold text-sm"
                >
                  Submit Another Request
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
