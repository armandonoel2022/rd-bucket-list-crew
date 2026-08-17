CREATE TABLE public.shared_state (
  id text PRIMARY KEY,
  data jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by text
);

GRANT SELECT, INSERT, UPDATE ON public.shared_state TO anon;
GRANT SELECT, INSERT, UPDATE ON public.shared_state TO authenticated;
GRANT ALL ON public.shared_state TO service_role;

ALTER TABLE public.shared_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read shared state" ON public.shared_state FOR SELECT USING (true);
CREATE POLICY "Anyone can create shared state" ON public.shared_state FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update shared state" ON public.shared_state FOR UPDATE USING (true) WITH CHECK (true);

ALTER TABLE public.shared_state REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.shared_state;