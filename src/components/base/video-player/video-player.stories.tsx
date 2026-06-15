import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VideoPlayer } from "./video-player";

const meta = {
    title: "Components/Video Player",
    component: VideoPlayer,
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "A fully-featured video player component with controls for play/pause, volume, fullscreen, playback speed, and progress tracking. Supports thumbnails, keyboard shortcuts, and customizable sizes.",
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {
        src: {
            control: "text",
            description: "The URL of the video",
        },
        type: {
            control: "text",
            description: "The MIME type of the video (e.g., 'video/mp4')",
        },
        autoPlay: {
            control: "boolean",
            description: "Whether the video should start playing automatically",
        },
        thumbnailUrl: {
            control: "text",
            description: "URL of the thumbnail image to show before the video starts",
        },
        thumbnailAlt: {
            control: "text",
            description: "Alt text for the thumbnail image",
        },
        showThumbnailOverlay: {
            control: "boolean",
            description: "Whether to show a semi-transparent overlay on the thumbnail",
        },
        size: {
            control: "select",
            options: ["sm", "md", "lg"],
            description: "Size of the video player",
        },
        className: {
            control: "text",
            description: "Additional CSS classes",
        },
    },
} satisfies Meta<typeof VideoPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample video URLs for examples
const sampleVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const sampleThumbnailUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg";

// Video Player Example - Main docs content
export const VideoPlayerExample: Story = {
    args: {
        src: sampleVideoUrl,
    },
    render: () => (
        <div className="mt-10 space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Video Player Variants</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        A comprehensive video player component with full controls including play/pause, volume, fullscreen, playback speed, and progress tracking.
                        Supports thumbnails, keyboard shortcuts, and three size variants.
                    </p>
                </div>
                <div className="space-y-6">
                    <div>
                        <h4 className="mb-2 text-sm font-semibold text-text-secondary">Small Size</h4>
                        <div className="max-w-md">
                            <VideoPlayer
                                src={sampleVideoUrl}
                                size="sm"
                                className="aspect-video w-full max-w-80 overflow-hidden rounded-lg"
                                thumbnailUrl={sampleThumbnailUrl}
                                thumbnailAlt="Big Buck Bunny thumbnail"
                            />
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-2 text-sm font-semibold text-text-secondary">Medium Size (Default)</h4>
                        <div className="max-w-2xl">
                            <VideoPlayer
                                src={sampleVideoUrl}
                                size="md"
                                thumbnailUrl={sampleThumbnailUrl}
                                thumbnailAlt="Big Buck Bunny thumbnail"
                            />
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-2 text-sm font-semibold text-text-secondary">Large Size</h4>
                        <div className="max-w-4xl">
                            <VideoPlayer
                                src={sampleVideoUrl}
                                size="lg"
                                thumbnailUrl={sampleThumbnailUrl}
                                thumbnailAlt="Big Buck Bunny thumbnail"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Comprehensive examples of video player sizes and features.",
            },
        },
        docsOnly: true,
    },
};

// Basic Examples
export const Small: Story = {
    args: {
        src: sampleVideoUrl,
        size: "sm",
        className: "aspect-video w-full max-w-80 overflow-hidden rounded-lg",
        thumbnailUrl: sampleThumbnailUrl,
        thumbnailAlt: "Video thumbnail",
    },
    parameters: {
        docs: {
            description: {
                story: "Small size video player with minimal controls. Progress bar is visually hidden but still functional.",
            },
        },
    },
};

export const Medium: Story = {
    args: {
        src: sampleVideoUrl,
        size: "md",
        className: "max-w-2xl",
        thumbnailUrl: sampleThumbnailUrl,
        thumbnailAlt: "Video thumbnail",
    },
    parameters: {
        docs: {
            description: {
                story: "Medium size video player (default) with standard controls including play/pause, mute, and progress bar.",
            },
        },
    },
};

export const Large: Story = {
    args: {
        src: sampleVideoUrl,
        size: "lg",
        thumbnailUrl: sampleThumbnailUrl,
        thumbnailAlt: "Video thumbnail",
    },
    parameters: {
        docs: {
            description: {
                story: "Large size video player with full controls including volume slider and playback speed control.",
            },
        },
    },
};

// With Thumbnail
export const WithThumbnail: Story = {
    args: {
        src: sampleVideoUrl,
        size: "md",
        thumbnailUrl: sampleThumbnailUrl,
        thumbnailAlt: "Big Buck Bunny - A short animated film",
    },
    parameters: {
        docs: {
            description: {
                story: "Video player with a thumbnail image that displays before playback starts. Click the play button to start the video.",
            },
        },
    },
};

// With Thumbnail Overlay
export const WithThumbnailOverlay: Story = {
    args: {
        src: sampleVideoUrl,
        size: "md",
        thumbnailUrl: sampleThumbnailUrl,
        thumbnailAlt: "Big Buck Bunny - A short animated film",
        showThumbnailOverlay: true,
    },
    parameters: {
        docs: {
            description: {
                story: "Video player with thumbnail and a semi-transparent overlay for better visual contrast.",
            },
        },
    },
};

// Without Thumbnail
export const WithoutThumbnail: Story = {
    args: {
        src: sampleVideoUrl,
        size: "md",
    },
    parameters: {
        docs: {
            description: {
                story: "Video player without a thumbnail. The video will display immediately.",
            },
        },
    },
};

// Autoplay
export const Autoplay: Story = {
    args: {
        src: sampleVideoUrl,
        size: "md",
        autoPlay: true,
        thumbnailUrl: sampleThumbnailUrl,
        thumbnailAlt: "Video thumbnail",
    },
    parameters: {
        docs: {
            description: {
                story: "Video player that starts playing automatically when loaded. Note: Autoplay may be blocked by browser policies.",
            },
        },
    },
};

// Custom Styling
export const CustomStyling: Story = {
    args: {
        src: sampleVideoUrl,
        size: "md",
        thumbnailUrl: sampleThumbnailUrl,
        thumbnailAlt: "Video thumbnail",
        className: "rounded-2xl",
    },
    parameters: {
        docs: {
            description: {
                story: "Video player with custom rounded corners applied via className prop.",
            },
        },
    },
};

// Different Video Format
export const WebMFormat: Story = {
    args: {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        type: "video/webm",
        size: "md",
        thumbnailUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
        thumbnailAlt: "Elephants Dream thumbnail",
    },
    parameters: {
        docs: {
            description: {
                story: "Video player configured for WebM format. The type prop specifies the MIME type of the video.",
            },
        },
    },
};

// Keyboard Shortcuts Info
export const KeyboardShortcuts: Story = {
    args: {
        src: sampleVideoUrl,
    },
    render: () => (
        <div className="mt-10 space-y-6">
            <div>
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Keyboard Shortcuts</h3>
                <div className="mb-7 max-w-lg space-y-2">
                    <p className="text-sm text-text-secondary">
                        The video player supports various keyboard shortcuts for better accessibility and user experience:
                    </p>
                </div>
                <div className="max-w-2xl">
                    <VideoPlayer
                        src={sampleVideoUrl}
                        size="md"
                        thumbnailUrl={sampleThumbnailUrl}
                        thumbnailAlt="Video thumbnail"
                    />
                </div>
                <div className="mt-6 space-y-2 text-sm text-text-secondary">
                    <p>
                        <strong className="text-text-primary">Space or K:</strong> Play/Pause
                    </p>
                    <p>
                        <strong className="text-text-primary">F:</strong> Toggle fullscreen
                    </p>
                    <p>
                        <strong className="text-text-primary">M:</strong> Mute/Unmute
                    </p>
                    <p>
                        <strong className="text-text-primary">↑:</strong> Increase volume
                    </p>
                    <p>
                        <strong className="text-text-primary">↓:</strong> Decrease volume
                    </p>
                    <p>
                        <strong className="text-text-primary">←:</strong> Rewind 10 seconds
                    </p>
                    <p>
                        <strong className="text-text-primary">→:</strong> Fast forward 10 seconds
                    </p>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Interactive video player demonstrating keyboard shortcuts. Focus the video player and try the shortcuts listed below.",
            },
        },
        docsOnly: true,
    },
};
