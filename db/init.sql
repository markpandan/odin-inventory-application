CREATE TABLE IF NOT EXISTS animes (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ) NOT NULL,
    rating REAL NOT NULL,
    description TEXT NOT NULL,
    imageURL TEXT
);

CREATE TABLE IF NOT EXISTS genres (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS animes_to_genres (
    anime_id INT,
    genre_id INT,

    CONSTRAINT fk_anime
        FOREIGN KEY(anime_id)
        REFERENCES animes(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_genre
        FOREIGN KEY(genre_id)
        REFERENCES genres(id)
        ON DELETE SET NULL
);

-- Data was based on https://myanimelist.net
INSERT INTO genres (name) VALUES 
('Action'), 
('Comedy'),
('Horror'),
('Sports'),
('Adventure'),
('Drama'),
('Mystery'),
('Supernatural'),
('Avant Garde'),
('Fantasy'),
('Romance'),
('Suspense'),
('Award Winning'),
('Girls Love'),
('Sci-Fi'),
('Boys Love'),
('Gourmet'),
('Slice of Life');

INSERT INTO animes (name, rating, description) VALUES 
('Shingeki no Kyojin', 8.56, 'Lorem Ipsum'),
('One Piece', 8.73, 'Lorem Ipsum'),
('Mob Psycho 100', 8.49, 'Lorem Ipsum');

INSERT INTO animes_to_genres VALUES 
(1, 1),
(1, 13),
(1, 6),
(1, 12),
(2, 1),
(2, 5),
(2, 10),
(3, 1),
(3, 2),
(3, 8);



