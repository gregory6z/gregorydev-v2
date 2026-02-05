# Register Form

Multi-step registration tunnel (3 steps + confirmation).

## Structure

```
index.tsx                  # Orchestrator (FormProvider + step state: 1 | 2 | 3 | "done")
register-stepper.tsx       # Progress dots (active = white, inactive = white/30)
register-step-siret.tsx    # Step 1 — SIRET input (formatted, Luhn validated) + API lookup
register-step-company.tsx  # Step 2 — Company readonly fields + phone input
register-step-user.tsx     # Step 3 — User info + password + register mutation
register-confirmation.tsx  # Success screen → navigate to /login
```

## Flow

- Step 1: User enters SIRET → validation (14 digits + Luhn) → API lookup → company data injected via `setValue()`
- Step 2: Company name and address displayed readonly → user enters phone → next
- Step 3: User fills personal info + password → `useRegister` mutation → confirmation
- Backward navigation preserves all data (FormProvider keeps state)

## Multi-step form with Zod + React Hook Form

### Why FormProvider?

A single `useForm()` instance lives in the orchestrator and is shared to all steps via `FormProvider`. Each step accesses the form through `useFormContext()`. This gives every step read/write access to all fields — for example, the orchestrator injects SIRET lookup data into step 2 fields via `setValue()`.

### Schema architecture

There are per-step schemas (`siretSchema`, `companySchema`, `userSchema`) and one combined `registerSchema` that merges all three. Only the combined schema is passed to `zodResolver` in the orchestrator. The per-step schemas serve as documentation and could be used for isolated validation if needed.

### Per-step validation with trigger()

Each step validates only its own fields via `trigger()`. Step 1 validates SIRET only, step 2 validates phone only, step 3 validates all user fields. `trigger()` runs the resolver but only on the requested fields — empty fields from other steps don't block the current step.

## Other patterns

- **Formatted inputs** (SIRET, phone): local `useState` for display value, `setValue()` stores raw digits in RHF
- **Validation** runs against raw digits — formatting is display-only
- **Buttons**: "Suivant" = default variant, "Précédent" = auth-secondary variant (`bg-primary-darkest`)
