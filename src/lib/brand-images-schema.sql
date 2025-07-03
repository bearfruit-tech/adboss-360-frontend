
CREATE TABLE brand_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500) NOT NULL,
    source_url VARCHAR(500),
    author VARCHAR(255),
    source VARCHAR(100), 
    image_type VARCHAR(50), 
    style_category VARCHAR(50), 
    tags TEXT[], 
    demographics TEXT[], 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);


CREATE TABLE industries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    keywords TEXT[], 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE brand_personalities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    personality_type VARCHAR(50) NOT NULL, 
    score_range INTEGER[2] NOT NULL, 
    keywords TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE image_industries (
    image_id UUID REFERENCES brand_images(id) ON DELETE CASCADE,
    industry_id UUID REFERENCES industries(id) ON DELETE CASCADE,
    relevance_score INTEGER DEFAULT 10, 
    PRIMARY KEY (image_id, industry_id)
);


CREATE TABLE image_personalities (
    image_id UUID REFERENCES brand_images(id) ON DELETE CASCADE,
    personality_id UUID REFERENCES brand_personalities(id) ON DELETE CASCADE,
    relevance_score INTEGER DEFAULT 10,
    PRIMARY KEY (image_id, personality_id)
);


CREATE INDEX idx_brand_images_type ON brand_images(image_type);
CREATE INDEX idx_brand_images_style ON brand_images(style_category);
CREATE INDEX idx_brand_images_active ON brand_images(is_active);
CREATE INDEX idx_image_industries_relevance ON image_industries(relevance_score);
CREATE INDEX idx_image_personalities_relevance ON image_personalities(relevance_score);


INSERT INTO industries (name, keywords) VALUES
('Technology', ARRAY['tech', 'software', 'digital', 'innovation', 'startup', 'saas', 'ai', 'blockchain']),
('Healthcare', ARRAY['medical', 'health', 'wellness', 'pharmaceutical', 'clinic', 'hospital', 'therapy']),
('Finance', ARRAY['banking', 'investment', 'fintech', 'insurance', 'accounting', 'cryptocurrency', 'trading']),
('Education', ARRAY['learning', 'school', 'university', 'training', 'academic', 'online learning', 'courses']),
('Retail', ARRAY['shopping', 'ecommerce', 'fashion', 'consumer', 'marketplace', 'boutique', 'store']),
('Food & Beverage', ARRAY['restaurant', 'cafe', 'food', 'beverage', 'culinary', 'organic', 'catering']),
('Real Estate', ARRAY['property', 'housing', 'construction', 'architecture', 'development', 'interior']),
('Professional Services', ARRAY['consulting', 'legal', 'marketing', 'agency', 'business services', 'freelance']),
('Security', ARRAY['security', 'protection', 'surveillance', 'safety', 'guard', 'monitoring']),
('Construction', ARRAY['construction', 'building', 'contractor', 'engineering', 'infrastructure', 'development']);

INSERT INTO brand_personalities (name, personality_type, score_range, keywords) VALUES
('Highly Formal', 'formal_casual', ARRAY[0, 25], ARRAY['corporate', 'professional', 'serious', 'traditional', 'conservative']),
('Moderately Formal', 'formal_casual', ARRAY[26, 45], ARRAY['business', 'polished', 'refined', 'structured']),
('Balanced', 'formal_casual', ARRAY[46, 55], ARRAY['approachable', 'professional', 'balanced', 'versatile']),
('Moderately Casual', 'formal_casual', ARRAY[56, 75], ARRAY['friendly', 'relaxed', 'approachable', 'conversational']),
('Highly Casual', 'formal_casual', ARRAY[76, 100], ARRAY['informal', 'laid-back', 'fun', 'easygoing', 'personal']),

('Highly Traditional', 'traditional_modern', ARRAY[0, 25], ARRAY['classic', 'timeless', 'heritage', 'established', 'conventional']),
('Moderately Traditional', 'traditional_modern', ARRAY[26, 45], ARRAY['refined', 'elegant', 'sophisticated', 'enduring']),
('Balanced Traditional-Modern', 'traditional_modern', ARRAY[46, 55], ARRAY['contemporary', 'updated', 'evolved', 'transitional']),
('Moderately Modern', 'traditional_modern', ARRAY[56, 75], ARRAY['current', 'fresh', 'innovative', 'progressive']),
('Highly Modern', 'traditional_modern', ARRAY[76, 100], ARRAY['cutting-edge', 'futuristic', 'avant-garde', 'revolutionary', 'disruptive']),

('Highly Serious', 'serious_playful', ARRAY[0, 25], ARRAY['professional', 'formal', 'focused', 'authoritative', 'no-nonsense']),
('Moderately Serious', 'serious_playful', ARRAY[26, 45], ARRAY['thoughtful', 'considered', 'purposeful', 'deliberate']),
('Balanced Serious-Playful', 'serious_playful', ARRAY[46, 55], ARRAY['engaging', 'personable', 'relatable', 'human']),
('Moderately Playful', 'serious_playful', ARRAY[56, 75], ARRAY['creative', 'energetic', 'lighthearted', 'expressive']),
('Highly Playful', 'serious_playful', ARRAY[76, 100], ARRAY['fun', 'whimsical', 'bold', 'experimental', 'quirky']);