-- Add new columns to profiles table for mentor information
ALTER TABLE public.profiles 
ADD COLUMN full_name TEXT,
ADD COLUMN role TEXT CHECK (role IN ('mentor', 'learner')),
ADD COLUMN field_of_expertise TEXT,
ADD COLUMN bio TEXT,
ADD COLUMN profile_photo_url TEXT,
ADD COLUMN average_rating NUMERIC(2,1) DEFAULT 0.0 CHECK (average_rating >= 0 AND average_rating <= 5);

-- Update the handle_new_user function to include new fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, age, full_name, role, field_of_expertise, bio)
  VALUES (
    NEW.id,
    (NEW.raw_user_meta_data->>'age')::integer,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'role',
    NEW.raw_user_meta_data->>'field_of_expertise',
    NEW.raw_user_meta_data->>'bio'
  );
  RETURN NEW;
END;
$$;