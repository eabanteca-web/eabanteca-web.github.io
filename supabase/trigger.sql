-- Create a trigger function to call the Edge Function on INSERT
CREATE OR REPLACE FUNCTION public.handle_new_manifesto_signature()
RETURNS TRIGGER AS $$
DECLARE
  function_url TEXT;
  response RECORD;
BEGIN
  -- Get the Edge Function URL
  function_url := 'https://wozhsunyhxvankwvztwc.supabase.co/functions/v1/send-manifesto-email';
  
  -- Call the Edge Function asynchronously
  PERFORM net.http_post(
    url := function_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.jwt_secret', true)
    ),
    body := jsonb_build_object(
      'record', row_to_json(NEW),
      'type', 'INSERT'
    )
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
DROP TRIGGER IF EXISTS on_manifesto_signature_created ON public.manifesto_signatures;
CREATE TRIGGER on_manifesto_signature_created
  AFTER INSERT ON public.manifesto_signatures
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_manifesto_signature();
