### @14.07.2024

#### Known Issues

- If date value is set I still can't submit the form.
   - If any other field is set, the form can be submitted.
   - The idea here is that the user is not allowed to submit if no field is set. Which works for all fields except the date fields

#### Missing features

- Pre-filling the form with values that are already in the database
- Pulling options from `dropdown_options...` table is missing. I can't refresh the supabase integration in gptEngineer right now. I could be doing it manually but I rather wait until the fix is available.