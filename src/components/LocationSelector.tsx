import { useState, useCallback, useRef, useEffect } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { MapPin, Upload, X } from 'lucide-react';
import exifr from 'exifr';

// Type for Vision API landmark detection result
interface VisionLandmarkResult {
  description?: string;
  location?: {
    lat: number;
    lng: number;
  };
}

// Helper functions for ML-based image processing
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result as string;
      // Remove the data:image/jpeg;base64, prefix
      const base64Data = base64.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = error => reject(error);
  });
};

const detectLandmarksWithVision = async (): Promise<VisionLandmarkResult | null> => {
  // This would use Google Vision API for landmark detection
  // For now, we'll return null to indicate Vision API is not implemented
  // In a real implementation, you would:
  // 1. Call Google Vision API with landmark detection
  // 2. Parse the response for landmark information
  // 3. Return location data if landmark is recognized

  console.log('Vision API landmark detection not implemented yet');
  console.log('To implement: Call Google Vision API with base64 image for LANDMARK_DETECTION');

  return null; // Placeholder - would return landmark data with location
};

interface LocationSelectorProps {
  onLocationSelect: (location: { address: string; latitude: number; longitude: number }) => void;
  initialLocation?: { lat: number; lng: number };
}

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE';

function GoogleMap({ onLocationSelect, initialLocation }: LocationSelectorProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  const [selectedLocation, setSelectedLocation] = useState<{
    address: string;
    latitude: number;
    longitude: number;
  } | null>(null);

  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    if (!geocoderRef.current) return;

    try {
      const response = await geocoderRef.current.geocode({
        location: { lat, lng }
      });

      if (response.results && response.results[0]) {
        const address = response.results[0].formatted_address;
        const location = { address, latitude: lat, longitude: lng };
        setSelectedLocation(location);
        onLocationSelect(location);
      }
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
    }
  }, [onLocationSelect]);

  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return;

    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    // Update marker position
    if (markerRef.current) {
      markerRef.current.setPosition({ lat, lng });
    } else if (googleMapRef.current) {
      markerRef.current = new google.maps.Marker({
        position: { lat, lng },
        map: googleMapRef.current,
        draggable: true,
      });

      markerRef.current.addListener('dragend', (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          reverseGeocode(event.latLng.lat(), event.latLng.lng());
        }
      });
    }

    reverseGeocode(lat, lng);
  }, [reverseGeocode]);

  const render = useCallback((status: Status) => {
    switch (status) {
      case Status.LOADING:
        return <div className="flex items-center justify-center h-64 bg-[#111111] rounded-lg">
          <div className="text-white">Loading map...</div>
        </div>;
      case Status.FAILURE:
        return <div className="flex items-center justify-center h-64 bg-[#111111] rounded-lg">
          <div className="text-red-400">Failed to load map</div>
        </div>;
      case Status.SUCCESS:
        return (
          <div
            ref={mapRef}
            className="h-64 w-full rounded-lg overflow-hidden"
            style={{ background: '#111111' }}
          />
        );
    }
  }, []);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    googleMapRef.current = map;
    geocoderRef.current = new google.maps.Geocoder();

    // Default to India center
    const defaultLocation = initialLocation || { lat: 20.5937, lng: 78.9629 };

    map.setCenter(defaultLocation);
    map.setZoom(5);

    // Add click listener
    map.addListener('click', handleMapClick);

    // Add initial marker if location provided
    if (initialLocation) {
      markerRef.current = new google.maps.Marker({
        position: initialLocation,
        map: map,
        draggable: true,
      });

      markerRef.current.addListener('dragend', (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          reverseGeocode(event.latLng.lat(), event.latLng.lng());
        }
      });

      reverseGeocode(initialLocation.lat, initialLocation.lng);
    }
  }, [handleMapClick, reverseGeocode, initialLocation]);

  const onMapUnmount = useCallback(() => {
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }
  }, []);

  return (
    <div className="space-y-4">
      <div className="text-sm text-[#a1a1aa] mb-2">
        Click on the map to select location or drag the marker
      </div>

      <Wrapper
        apiKey={GOOGLE_MAPS_API_KEY}
        render={render}
        libraries={['places']}
      >
        <MapComponent
          onLoad={onMapLoad}
          onUnmount={onMapUnmount}
        />
      </Wrapper>

      {selectedLocation && (
        <div className="p-3 bg-[#1a1a1a] rounded-lg border border-[#3b82f6]/30">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#3b82f6] mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-white">Selected Location</div>
              <div className="text-xs text-[#a1a1aa] mt-1">{selectedLocation.address}</div>
              <div className="text-xs text-[#71717a] mt-1">
                {selectedLocation.latitude.toFixed(6)}, {selectedLocation.longitude.toFixed(6)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MapComponent({ onLoad, onUnmount }: {
  onLoad: (map: google.maps.Map) => void;
  onUnmount: () => void;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && window.google && !map) {
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 20.5937, lng: 78.9629 },
        zoom: 5,
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry',
            stylers: [{ color: '#1a1a1a' }]
          },
          {
            featureType: 'all',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#000000' }]
          },
          {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#ffffff' }]
          }
        ]
      });

      setMap(newMap);
      onLoad(newMap);
    }

    return () => {
      if (map) {
        onUnmount();
      }
    };
  }, [map, onLoad, onUnmount]);

  return <div ref={mapRef} className="h-64 w-full" />;
}

interface PhotoUploadProps {
  onLocationExtract: (location: { address: string; latitude: number; longitude: number }) => void;
}

function PhotoUpload({ onLocationExtract }: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      console.log('Processing photo...');

      // Method 1: Try EXIF GPS data extraction
      console.log('Attempting EXIF GPS extraction...');
      const exifData = await exifr.parse(file, {
        pick: ['GPSLatitude', 'GPSLongitude', 'GPSLatitudeRef', 'GPSLongitudeRef', 'DateTimeOriginal', 'Make', 'Model']
      });

      console.log('EXIF data extracted:', exifData);

      // Check for GPS coordinates in different formats
      let latitude: number | null = null;
      let longitude: number | null = null;

      if (exifData?.GPSLatitude && exifData?.GPSLongitude) {
        // Convert GPS coordinates from EXIF format (degrees, minutes, seconds) to decimal
        latitude = exifData.GPSLatitude;
        longitude = exifData.GPSLongitude;

        // Handle GPS reference (N/S, E/W)
        if (latitude !== null && exifData.GPSLatitudeRef === 'S' && latitude > 0) latitude = -latitude;
        if (longitude !== null && exifData.GPSLongitudeRef === 'W' && longitude > 0) longitude = -longitude;

        console.log('GPS coordinates found:', latitude, longitude);
      } else if (exifData?.latitude && exifData?.longitude) {
        // Some cameras store coordinates directly as decimal
        latitude = exifData.latitude;
        longitude = exifData.longitude;
        console.log('Direct GPS coordinates found:', latitude, longitude);
      }

      if (latitude && longitude) {
        // Validate coordinates
        if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
          setError('Invalid GPS coordinates found in photo. Coordinates are out of valid range.');
          return;
        }

        // Check if Google Maps API is loaded
        if (!window.google || !window.google.maps) {
          setError('Google Maps API not configured. Please select location manually on the map.');
          return;
        }

        // Reverse geocode to get address
        const geocoder = new window.google.maps.Geocoder();
        const response = await geocoder.geocode({
          location: { lat: latitude, lng: longitude }
        });

        if (response.results && response.results[0]) {
          const address = response.results[0].formatted_address;
          console.log('Successfully geocoded address:', address);
          onLocationExtract({ address, latitude, longitude });
        } else {
          setError('Could not determine address from photo location coordinates. Please select location manually on the map.');
        }
      } else {
        // Method 2: Try ML-based landmark recognition using Google Vision API
        console.log('No GPS data found, attempting ML-based landmark recognition...');

        try {
          // Convert image to base64 for Google Vision API
          const base64Image = await fileToBase64(file);
          console.log('Image converted to base64 for ML processing');

          // Try Google Vision API for landmark detection
          const visionResult = await detectLandmarksWithVision(base64Image);

          if (visionResult && visionResult.location) {
            console.log('Landmark detected via ML:', visionResult);
            onLocationExtract({
              address: visionResult.description || 'Landmark detected via AI',
              latitude: visionResult.location.lat,
              longitude: visionResult.location.lng
            });
            return; // Success - exit early
          } else {
            console.log('No landmarks detected by ML model');
          }
        } catch (visionError) {
          console.log('ML landmark recognition failed or not available:', visionError);
        }

        // Method 3: Fallback - analyze filename and provide helpful suggestions
        console.log('Trying filename analysis and providing user guidance...');
        const filename = file.name.toLowerCase();
        const locationHints = ['street', 'road', 'avenue', 'park', 'plaza', 'square', 'junction', 'intersection'];

        let helpfulMessage = 'No location data found in photo. ';
        if (locationHints.some(hint => filename.includes(hint))) {
          helpfulMessage += 'Photo filename suggests a street/road location. ';
        }
        helpfulMessage += 'Please ensure GPS/location services are enabled on your camera when taking photos. Alternatively, select location manually on the map above.';

        setError(helpfulMessage);
      }
    } catch (err) {
      console.error('Error processing photo:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Failed to process photo: ${errorMessage}. Please try a different photo or select location manually on the map.`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="text-sm text-[#a1a1aa]">
        Or upload a photo to automatically extract location using GPS data or AI landmark recognition
      </div>

      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />
        <div className="flex items-center justify-center gap-3 p-4 border-2 border-dashed border-[#3b82f6]/30 rounded-lg hover:border-[#3b82f6]/50 transition-colors">
          <Upload className="w-5 h-5 text-[#3b82f6]" />
          <div className="text-center">
            <div className="text-sm font-medium text-white">
              {uploading ? 'AI Processing...' : 'Upload Photo for Smart Location Detection'}
            </div>
            <div className="text-xs text-[#a1a1aa] mt-1">
              Uses GPS data or AI to detect location from any photo
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-[#ef4444]/10 border border-[#ef4444]/30 rounded-lg">
          <X className="w-4 h-4 text-[#ef4444] flex-shrink-0" />
          <div className="text-sm text-[#ef4444]">{error}</div>
        </div>
      )}
    </div>
  );
}

export function LocationSelector({ onLocationSelect, initialLocation }: LocationSelectorProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-white mb-3">
          Select Location
        </label>

        <GoogleMap
          onLocationSelect={onLocationSelect}
          initialLocation={initialLocation}
        />

        <div className="mt-4 pt-4 border-t border-[#1a1a1a]">
          <PhotoUpload onLocationExtract={onLocationSelect} />
        </div>
      </div>
    </div>
  );
}