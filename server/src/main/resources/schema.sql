CREATE EXTENSION IF NOT EXISTS pg_bigm;

CREATE INDEX IF NOT EXISTS idx_posts_title_bigm ON posts USING gin (title gin_bigm_ops);
CREATE INDEX IF NOT EXISTS idx_posts_content_text_bigm ON posts USING gin (content_text gin_bigm_ops);
