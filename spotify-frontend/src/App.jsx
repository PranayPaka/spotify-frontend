import { useEffect, useState, memo } from "react";

// Memoized Planet Component to prevent unnecessary re-renders
const Planet = memo(({ track, index, radius, speed, delay }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (track?.albumImage) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        console.log(`Image loaded successfully for planet ${index}`);
        setImageLoaded(true);
        setImageError(false);
      };
      img.onerror = (e) => {
        console.log(
          `Image failed to load for planet ${index}:`,
          track?.albumImage,
          e
        );
        setImageError(true);
        setImageLoaded(false);
      };
      img.src = track.albumImage;
    }
  }, [track?.albumImage, index]);

  const hasValidImage =
    track?.albumImage &&
    track.albumImage.length > 0 &&
    imageLoaded &&
    !imageError;

  return (
    <div>
      {/* Planet with Orbit */}
      <div
        className={`planet-orbit orbit-${index}`}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: `${radius * 2}px`,
          height: `${radius * 2}px`,
          transform: `translate(-50%, -50%) rotate(0deg)`,
          animation: `orbit-${index} ${speed}s linear infinite`,
          animationDelay: `-${delay}s`,
          transformOrigin: "center",
          border: isHovered
            ? "1px solid rgba(255, 255, 255, 0.6)"
            : "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "50%",
          willChange: "transform",
          backfaceVisibility: "hidden",
          transition: "border-color 0.3s ease",
          pointerEvents: "none",
        }}
      >
        {/* Planet */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "0",
            transform: `translateY(-50%) ${
              isHovered ? "scale(1.4)" : "scale(1)"
            }`,
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundImage: hasValidImage
              ? `url(${track.albumImage})`
              : undefined,
            backgroundColor: hasValidImage
              ? undefined
              : `hsl(${index * 51.4}, 70%, 60%)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            border: "2px solid rgba(255, 255, 255, 0.4)",
            filter: isHovered
              ? "brightness(1.4) saturate(1.5)"
              : "brightness(1.1) saturate(1.2)",
            willChange: "transform",
            backfaceVisibility: "hidden",
            boxShadow: isHovered
              ? `0 0 35px rgba(255, 255, 255, 0.7), inset 0 0 20px rgba(0, 0, 0, 0.2)`
              : `0 0 20px rgba(255, 255, 255, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.2)`,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            cursor: "pointer",
            zIndex: isHovered ? 100 : 1,
            pointerEvents: "auto",
          }}
          className="planet"
          onMouseEnter={() => {
            console.log(`Hovering planet ${index}: ${track?.name}`);
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            console.log(`Leaving planet ${index}: ${track?.name}`);
            setIsHovered(false);
          }}
        />
      </div>

      {/* Tooltip */}
      {isHovered && (
        <div
          style={{
            position: "fixed",
            left: "50%",
            bottom: "80px",
            transform: "translateX(-50%)",
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "10px 14px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
            whiteSpace: "nowrap",
            zIndex: 1000,
            border: "1px solid rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            animation: "fadeInBottom 0.2s ease-out",
            pointerEvents: "none",
            textAlign: "center",
          }}
        >
          <div style={{ fontWeight: "600", marginBottom: "3px" }}>
            {track?.name || "Unknown Track"}
          </div>
          <div style={{ fontSize: "12px", opacity: 0.9 }}>
            {track?.artist || "Unknown Artist"}
          </div>
        </div>
      )}
    </div>
  );
});

// Starry Background Component
const StarryBackground = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < 200; i++) {
        starArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          animationDelay: Math.random() * 3,
        });
      }
      setStars(starArray);
    };

    generateStars();
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        background: `
          radial-gradient(ellipse at top, #1e1032 0%, #0a0118 50%, #000000 100%)
        `,
      }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: "white",
            borderRadius: "50%",
            opacity: star.opacity,
            animation: `twinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${star.animationDelay}s`,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.5)`,
          }}
        />
      ))}
    </div>
  );
};

// Login Screen Component
const LoginScreen = () => {
  const handleLogin = () => {
    window.location.href = "https://spotify-solar-system-backend.onrender.com/login";
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        position: "relative",
      }}
    >
      <StarryBackground />

      <div
        style={{
          textAlign: "center",
          zIndex: 10,
          background: "rgba(31, 31, 63, 0.8)",
          padding: "60px 40px",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "20px",
            background: "linear-gradient(45deg, #f59e0b, #d97706, #92400e)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Orbitify
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            marginBottom: "40px",
            opacity: 0.9,
            lineHeight: 1.6,
          }}
        >
          Explore your world of music
        </p>

        <button
          onClick={handleLogin}
          style={{
            background: "linear-gradient(135deg, #1DB954 0%, #1ed760 100%)",
            color: "white",
            border: "none",
            padding: "16px 32px",
            fontSize: "18px",
            fontWeight: "bold",
            borderRadius: "50px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 20px rgba(29, 185, 84, 0.4)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: "0 auto",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 8px 30px rgba(29, 185, 84, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 20px rgba(29, 185, 84, 0.4)";
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.297.539-1.02.718-1.559.42z" />
          </svg>
          Connect with Spotify
        </button>
      </div>
    </div>
  );
};

// Debug Panel Component
const DebugPanel = ({ tracks, error, userProfile, accessToken }) => {
  const [showDebug, setShowDebug] = useState(false);

  if (!showDebug) {
    return (
      <button
        onClick={() => setShowDebug(true)}
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          padding: "8px 12px",
          backgroundColor: "rgba(31, 31, 63, 0.8)",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "12px",
          zIndex: 10,
        }}
      >
        Debug Info
      </button>
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        left: "20px",
        padding: "15px",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "white",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "12px",
        fontSize: "12px",
        maxWidth: "300px",
        maxHeight: "400px",
        overflow: "auto",
        zIndex: 10,
        backdropFilter: "blur(10px)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <strong>Debug Info</strong>
        <button
          onClick={() => setShowDebug(false)}
          style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ×
        </button>
      </div>
      
      <div style={{ marginBottom: "10px" }}>
        <strong>Token Status:</strong> {accessToken ? "✅ Present" : "❌ Missing"}
      </div>
      
      <div style={{ marginBottom: "10px" }}>
        <strong>User Profile:</strong> {userProfile ? "✅ Loaded" : "❌ Missing"}
        {userProfile && (
          <div style={{ marginLeft: "10px", fontSize: "11px" }}>
            Name: {userProfile.display_name}<br/>
            ID: {userProfile.id}
          </div>
        )}
      </div>
      
      <div style={{ marginBottom: "10px" }}>
        <strong>Tracks Count:</strong> {tracks?.length || 0}
        {tracks?.length > 0 && (
          <div style={{ marginLeft: "10px", fontSize: "11px" }}>
            {tracks.map((track, i) => (
              <div key={i}>
                {i + 1}. {track.name} - {track.artist}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {error && (
        <div style={{ marginBottom: "10px" }}>
          <strong>Error:</strong> <span style={{ color: "#ff6b6b" }}>{error}</span>
        </div>
      )}
    </div>
  );
};

function App() {
  const [tracks, setTracks] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [timeRange, setTimeRange] = useState("short_term");
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BACKEND_URL = "https://spotify-solar-system-backend.onrender.com";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access_token");
    const error_param = params.get("error");

    if (error_param) {
      console.error("OAuth error:", error_param);
      setError(`Authentication error: ${error_param}`);
      setLoading(false);
      return;
    }

    if (token) {
      console.log("Access token found:", token.substring(0, 10) + "...");
      setAccessToken(token);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      console.log("No access token found in URL params");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log(`Fetching data with time range: ${timeRange}`);
        
        // Fetch user profile first
        console.log("Fetching user profile...");
        const profileResponse = await fetch(
          `${BACKEND_URL}/me?access_token=${accessToken}`
        );

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          console.log("User Profile Data:", profileData);
          setUserProfile(profileData);
        } else {
          const profileError = await profileResponse.text();
          console.error("Failed to fetch user profile:", profileResponse.status, profileError);
        }

        // Fetch top tracks with better error handling
        console.log("Fetching top tracks...");
        const tracksUrl = `${BACKEND_URL}/top-tracks?access_token=${accessToken}&time_range=${timeRange}`;
        console.log("Request URL:", tracksUrl);
        
        const tracksResponse = await fetch(tracksUrl);
        
        console.log("Tracks response status:", tracksResponse.status);
        console.log("Tracks response headers:", Object.fromEntries(tracksResponse.headers.entries()));

        if (!tracksResponse.ok) {
          const errorText = await tracksResponse.text();
          console.error("Tracks API Error:", {
            status: tracksResponse.status,
            statusText: tracksResponse.statusText,
            body: errorText
          });
          throw new Error(`HTTP ${tracksResponse.status}: ${errorText}`);
        }

        const tracksData = await tracksResponse.json();
        console.log("=== RAW BACKEND RESPONSE ===");
        console.log("Type:", typeof tracksData);
        console.log("Is Array:", Array.isArray(tracksData));
        console.log("Length:", tracksData?.length);
        console.log("Full Data:", tracksData);

        // Handle different response formats
        let processedTracks = [];
        
        if (Array.isArray(tracksData)) {
          processedTracks = tracksData;
        } else if (tracksData?.items && Array.isArray(tracksData.items)) {
          processedTracks = tracksData.items;
        } else if (tracksData?.tracks && Array.isArray(tracksData.tracks)) {
          processedTracks = tracksData.tracks;
        } else {
          console.warn("Unexpected data format:", tracksData);
          throw new Error("Unexpected response format from backend");
        }

        console.log("Processed tracks:", processedTracks);

        if (processedTracks.length === 0) {
          console.warn("No tracks in response");
          setError(
            `No tracks found for ${timeRange.replace('_', ' ')}. Try a different time range or listen to more music on Spotify!`
          );
          setTracks([]);
        } else {
          const mappedTracks = processedTracks.slice(0, 7).map((track, index) => {
            console.log(`Processing track ${index}:`, track);
            return {
              id: track.id || `track-${index}`,
              name: track.name || "Unknown Track",
              artist: track.artist || track.artists?.[0]?.name || "Unknown Artist",
              albumImage: track.albumImage || track.album?.images?.[0]?.url || "",
            };
          });

          console.log("Final mapped tracks:", mappedTracks);
          setTracks(mappedTracks);
          setError(null);
        }
      } catch (error) {
        console.error("Detailed error fetching data:", {
          message: error.message,
          stack: error.stack,
          name: error.name
        });
        setError(`Failed to fetch data: ${error.message}`);
        setTracks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [accessToken, timeRange]);

  // Show login screen if no access token
  if (!accessToken) {
    return <LoginScreen />;
  }

  // Show loading screen
  if (loading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          position: "relative",
        }}
      >
        <StarryBackground />
        <div style={{ textAlign: "center", zIndex: 10 }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              border: "4px solid rgba(255, 255, 255, 0.3)",
              borderTop: "4px solid #1DB954",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px",
            }}
          />
          <p style={{ fontSize: "1.2rem", opacity: 0.9 }}>
            Loading your music universe...
          </p>
        </div>
      </div>
    );
  }

  const timeRangeOptions = [
    { value: "short_term", label: "🕒 Last 4 weeks" },
    { value: "medium_term", label: "📅 Last 6 months" },
    { value: "long_term", label: "📈 All time" },
  ];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <StarryBackground />

      {/* Controls */}
      <div
        style={{ position: "absolute", top: "20px", left: "20px", zIndex: 10 }}
      >
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          style={{
            padding: "12px 16px",
            borderRadius: "12px",
            fontSize: "16px",
            backgroundColor: "rgba(31, 31, 63, 0.8)",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            cursor: "pointer",
            backdropFilter: "blur(10px)",
            marginRight: "10px",
          }}
        >
          {timeRangeOptions.map(({ value, label }) => (
            <option
              key={value}
              value={value}
              style={{ backgroundColor: "#1f1f3f" }}
            >
              {label}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setAccessToken(null);
            setTracks([]);
            setUserProfile(null);
            setError(null);
          }}
          style={{
            padding: "12px 16px",
            borderRadius: "12px",
            fontSize: "16px",
            backgroundColor: "rgba(220, 38, 38, 0.8)",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            cursor: "pointer",
            backdropFilter: "blur(10px)",
          }}
        >
          Logout
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div
          style={{
            position: "absolute",
            top: "100px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(220, 38, 38, 0.9)",
            color: "white",
            padding: "15px 25px",
            borderRadius: "10px",
            zIndex: 10,
            textAlign: "center",
            backdropFilter: "blur(10px)",
            maxWidth: "80%",
          }}
        >
          {error}
        </div>
      )}

      {/* Central Universe */}
      <div
        style={{
          width: "min(90vmin, 90vw)",
          height: "min(90vmin, 90vw)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Sun (User Profile) */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            backgroundImage: userProfile?.images?.[0]?.url
              ? `url(${userProfile.images[0].url})`
              : undefined,
            background: userProfile?.images?.[0]?.url
              ? `url(${userProfile.images[0].url})`
              : "radial-gradient(circle, #f59e0b 0%, #d97706 50%, #92400e 100%)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            transform: "translate(-50%, -50%)",
            border: "3px solid rgba(251, 191, 36, 0.6)",
            boxShadow: `
              0 0 40px rgba(251, 191, 36, 0.8),
              0 0 80px rgba(251, 191, 36, 0.4),
              inset 0 0 40px rgba(0, 0, 0, 0.2)
            `,
            animation: "pulse 4s ease-in-out infinite",
          }}
          title={userProfile?.display_name || "User"}
        />

        {/* Planets (Top Tracks) */}
        {tracks.length > 0
          ? tracks.map((track, index) => {
              const radius = 100 + index * 45;
              const speed = 25 + index * 5;
              const delay = Math.floor(Math.random() * speed);

              return (
                <Planet
                  key={`${track.id}-${index}`}
                  track={track}
                  index={index}
                  radius={radius}
                  speed={speed}
                  delay={delay}
                />
              );
            })
          : !loading &&
            !error && (
              <div
                style={{
                  position: "absolute",
                  top: "70%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  textAlign: "center",
                  opacity: 0.7,
                }}
              >
                <p>No top tracks available for the selected time range</p>
              </div>
            )}
      </div>

      {/* Debug Panel */}
      <DebugPanel 
        tracks={tracks}
        error={error}
        userProfile={userProfile}
        accessToken={accessToken}
      />

      <style>{`
        ${[...Array(10)]
          .map(
            (_, i) => `
          @keyframes orbit-${i} {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
        `
          )
          .join("\n")}

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @keyframes pulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 
              0 0 40px rgba(251, 191, 36, 0.8),
              0 0 80px rgba(251, 191, 36, 0.4),
              inset 0 0 40px rgba(0, 0, 0, 0.2);
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.05);
            box-shadow: 
              0 0 50px rgba(251, 191, 36, 1),
              0 0 100px rgba(251, 191, 36, 0.6),
              inset 0 0 40px rgba(0, 0, 0, 0.2);
          }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes fadeInBottom {
          0% { 
            opacity: 0; 
            transform: translateX(-50%) translateY(20px);
          }
          100% { 
            opacity: 1; 
            transform: translateX(-50%) translateY(0);
          }
        }

        select::-webkit-scrollbar {
          width: 8px;
        }

        select::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        select::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }

        select::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}

export default App;
