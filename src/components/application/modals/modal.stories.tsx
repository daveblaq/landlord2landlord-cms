import React from "react";
import { type SyntheticEvent, useEffect, useMemo, useState } from "react";
import { endOfMonth, endOfWeek, getLocalTimeZone, startOfMonth, startOfWeek, today } from "@internationalized/date";
import { useControlledState } from "@react-stately/utils";
import type { Meta, StoryObj } from "@storybook/react";
import {
    Archive,
    ArrowLeft,
    BarChart04,
    BellRinging01,
    Building05,
    Calendar,
    CalendarCheck02,
    Check,
    CheckCircle,
    Clock,
    Code02,
    Contrast01,
    Copy01,
    CreditCard01,
    CreditCardRefresh,
    Crop01,
    CurrencyDollarCircle,
    Edit01,
    Edit04,
    File02,
    Flag05,
    HelpCircle,
    ImagePlus,
    ImageUser,
    LayersThree01,
    LayersTwo01,
    Lock01,
    Mail01,
    MessageChatCircle,
    Minus,
    Plus,
    Save01,
    Shield01,
    Stars02,
    Trash01,
    UploadCloud02,
    User01,
    UserPlus01,
    UsersCheck,
    UsersPlus,
    Zap,
} from "@untitledui/icons";
import type { DateValue } from "react-aria";
import {
    DateRangePicker as AriaDateRangePicker,
    Heading as AriaHeading,
    Radio as AriaRadio,
    RadioGroup as AriaRadioGroup,
    Form,
    useLocale,
} from "react-aria-components";
import { ColorField, ColorSwatch } from "react-aria-components";
import { type Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import { Carousel, CarouselContext } from "@/components/application/carousel/carousel-base";
import { DateInput } from "@/components/application/date-picker/date-input";
import { RangeCalendar } from "@/components/application/date-picker/range-calendar";
import { RangePresetButton } from "@/components/application/date-picker/range-preset";
import { FileUpload as FileUploadComponent } from "@/components/application/file-upload/file-upload-base";
import { FileUploadDropZone } from "@/components/application/file-upload/file-upload-base";
import { MessageActionAdvanced } from "@/components/application/messaging/message-action.demo";
import { Dark, Light, System } from "@/components/application/modals/base-components/appearances";
import { DefaultBanner, DefaultBannerSM, NoneBanner, NoneBannerSM, SimplifiedBanner } from "@/components/application/modals/base-components/banners";
import { generateRgbShades } from "@/components/application/modals/base-components/generate-shades";
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { AvatarProfilePhoto } from "@/components/base/avatar/avatar-profile-photo";
import { AvatarAddButton } from "@/components/base/avatar/base-components";
import { VerifiedTick } from "@/components/base/avatar/base-components";
import { BadgeWithIcon } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { CloseButton } from "@/components/base/buttons/close-button";
import { SocialButton } from "@/components/base/buttons/social-button";
import { Checkbox, CheckboxBase } from "@/components/base/checkbox/checkbox";
import { FileTrigger } from "@/components/base/file-upload-trigger/file-upload-trigger";
import { Input } from "@/components/base/input/input";
import { InputBase, TextField } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { PaymentInput } from "@/components/base/input/input-payment";
import { Label } from "@/components/base/input/label";
import { PinInput } from "@/components/base/pin-input/pin-input";
import { RadioButtonBase } from "@/components/base/radio-buttons/radio-buttons";
import * as RadioGroups from "@/components/base/radio-groups/radio-groups";
import { Select } from "@/components/base/select/select";
import { TextEditor } from "@/components/base/text-editor/text-editor";
import { TextArea } from "@/components/base/textarea/textarea";
import { TextAreaBase } from "@/components/base/textarea/textarea";
import { VideoPlayer } from "@/components/base/video-player/video-player";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { UntitledLogoMinimal } from "@/components/foundations/logo/untitledui-logo-minimal";
import { MastercardIcon, VisaIcon } from "@/components/foundations/payment-icons";
import { CheckItemText } from "@/components/marketing/pricing-sections/base-components/pricing-tier-card";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { CreditCard } from "@/components/shared-assets/credit-card/credit-card";
import { Cropper } from "@/components/shared-assets/image-cropper/cropper";
import { GradientScan, QRCode } from "@/components/shared-assets/qr-code";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { useClipboard } from "@/hooks/use-clipboard";
import { countriesOptions } from "@/utils/countries";
import { cx } from "@/utils/cx";
import { ContentDivider } from "../content-divider/content-divider";
import { MetricsChart04 } from "../metrics/metrics";
import { DialogTrigger as AriaDialogTrigger, Dialog, Modal, ModalOverlay } from "./modal";

// import { CreditCard } from "@/components/shared-assets/credit-card/credit-card";

const meta = {
    title: "Application/Modals",
    component: ModalOverlay,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Modal dialogs for displaying important information, forms, and actions. Built with React Aria Components for accessibility and keyboard navigation.",
            },
        },
    },
    // Removed 'autodocs' tag to prevent all variants from rendering at once in docs view
    // tags: ['autodocs'],
} satisfies Meta<typeof ModalOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * This is a utility hook that automatically reopens the modal after
 * it's closed. It's used only for demo purposes and can be safely
 * removed and replaced with a regular `useState` hook.
 */
const useModalState = (defaultValue: boolean = true) => {
    const [isOpen, setIsOpen] = useState(defaultValue);

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setIsOpen(true);
            }, 700);
        }
    }, [isOpen]);

    return [isOpen, setIsOpen] as const;
};

const Logo = () => {
    return (
        <svg viewBox="0 0 56 56" fill="none" className="size-10 rounded-full shadow-lg md:size-14">
            <g clipPath="url(#clip0_9228_22962)">
                <path d="M0 28C0 12.536 12.536 0 28 0V0C43.464 0 56 12.536 56 28V28C56 43.464 43.464 56 28 56V56C12.536 56 0 43.464 0 28V28Z" fill="#0A0D12" />
                <rect width="56" height="56" fill="url(#paint0_radial_9228_22962)" fillOpacity="0.3" />
                <rect width="56" height="56" fill="url(#paint1_radial_9228_22962)" fillOpacity="0.05" />
                <rect width="56" height="56" fill="url(#paint2_radial_9228_22962)" fillOpacity="0.1" />
                <g filter="url(#filter0_d_9228_22962)">
                    <path
                        d="M12.9609 27.9997C12.9609 24.7542 13.9888 21.7489 15.7367 19.2913H23.2526V20.6997C20.8695 22.2535 19.2943 24.9426 19.2943 27.9997C19.2943 32.8092 23.1931 36.708 28.0026 36.708V43.0413C19.6953 43.0413 12.9609 36.307 12.9609 27.9997Z"
                        fill="url(#paint3_linear_9228_22962)"
                    />
                    <path
                        d="M40.2685 36.708C42.0164 34.2505 43.0443 31.2451 43.0443 27.9997C43.0443 19.6924 36.3099 12.958 28.0026 12.958V19.2913C32.8121 19.2913 36.7109 23.1902 36.7109 27.9997C36.7109 31.0567 35.1357 33.7459 32.7526 35.2997V36.708H40.2685Z"
                        fill="url(#paint4_linear_9228_22962)"
                    />
                </g>
                <path
                    d="M44.8 14.1446C44.8 18.8639 37.2783 15.8536 28 15.8536C18.7216 15.8536 11.2 18.8639 11.2 14.1446C11.2 9.42534 18.7216 5.59961 28 5.59961C37.2783 5.59961 44.8 9.42534 44.8 14.1446Z"
                    fill="url(#paint5_linear_9228_22962)"
                    fillOpacity="0.6"
                />
            </g>
            <defs>
                <filter
                    id="filter0_d_9228_22962"
                    x="9.79427"
                    y="8.20833"
                    width="36.4166"
                    height="44.3333"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feMorphology radius="1.58333" operator="erode" in="SourceAlpha" result="effect1_dropShadow_9228_22962" />
                    <feOffset dy="2.375" />
                    <feGaussianBlur stdDeviation="2.375" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0.1 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_9228_22962" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_9228_22962" result="shape" />
                </filter>
                <radialGradient
                    id="paint0_radial_9228_22962"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(28 28) rotate(90) scale(28)"
                >
                    <stop offset="0.746599" stopColor="white" stopOpacity="0" />
                    <stop offset="1" stopColor="white" />
                </radialGradient>
                <radialGradient
                    id="paint1_radial_9228_22962"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(28 16.1) rotate(90) scale(24.5)"
                >
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                </radialGradient>
                <radialGradient
                    id="paint2_radial_9228_22962"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(28) rotate(90) scale(42)"
                >
                    <stop stopColor="white" stopOpacity="0" />
                    <stop offset="0.5" stopColor="white" stopOpacity="0" />
                    <stop offset="0.99" stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="paint3_linear_9228_22962" x1="28.0026" y1="12.958" x2="28.0026" y2="43.0413" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0.8" />
                    <stop offset="1" stopColor="white" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="paint4_linear_9228_22962" x1="28.0026" y1="12.958" x2="28.0026" y2="43.0413" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0.8" />
                    <stop offset="1" stopColor="white" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="paint5_linear_9228_22962" x1="28" y1="5.59961" x2="28" y2="16.7996" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0.1" />
                </linearGradient>
                <clipPath id="clip0_9228_22962">
                    <path
                        d="M0 28C0 12.536 12.536 0 28 0V0C43.464 0 56 12.536 56 28V28C56 43.464 43.464 56 28 56V56C12.536 56 0 43.464 0 28V28Z"
                        fill="white"
                    />
                </clipPath>
            </defs>
        </svg>
    );
};

// Basic Modal Examples
// Commented out to prevent browser crash - displays all modals at once
// export const ModalsExamples: Story = {
//   render: () => {
//     const ModalsExamplesComponent = () => {
//       const [isOpen, setIsOpen] = useModalState();
//       return (
//         <div className="space-y-4">
//           <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
//             <ModalOverlay isDismissable>
//               <Modal>
//                 <Dialog>
//                   <div className="relative w-full max-w-120 overflow-hidden rounded-2xl bg-primary shadow-xl">
//                     <div className="flex flex-col items-center gap-5 px-4 py-6 text-center md:px-6 md:pt-8">
//                       <Logo />

//                       <div className="w-full md:max-w-xs">
//                         <p className="text-md font-semibold text-quaternary md:text-lg">
//                           Hi Olivia,
//                         </p>
//                         <Heading
//                           slot="title"
//                           className="text-md font-semibold text-primary md:text-lg"
//                         >
//                           Welcome back! How can I help?
//                         </Heading>
//                         <p className="mt-2 text-sm text-tertiary">
//                           I&apos;m here to help tackle your tasks. Choose from
//                           the prompts below or tell me what you need!
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex flex-col px-4 pb-8 md:px-6">
//                       <div className="flex flex-wrap justify-center gap-2">
//                         <button className="cursor-pointer rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
//                           <BadgeWithIcon
//                             color="success"
//                             size="lg"
//                             type="modern"
//                             iconLeading={ImageUser}
//                           >
//                             Create image
//                           </BadgeWithIcon>
//                         </button>
//                         <button className="cursor-pointer rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
//                           <BadgeWithIcon
//                             color="blue"
//                             size="lg"
//                             type="modern"
//                             iconLeading={BarChart04}
//                           >
//                             Analyze data
//                           </BadgeWithIcon>
//                         </button>
//                         <button className="cursor-pointer rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
//                           <BadgeWithIcon
//                             color="purple"
//                             size="lg"
//                             type="modern"
//                             iconLeading={Zap}
//                           >
//                             Make a plan
//                           </BadgeWithIcon>
//                         </button>
//                         <button className="cursor-pointer rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
//                           <BadgeWithIcon
//                             color="pink"
//                             size="lg"
//                             type="modern"
//                             iconLeading={File02}
//                           >
//                             Summarize text
//                           </BadgeWithIcon>
//                         </button>
//                         <button className="cursor-pointer rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
//                           <BadgeWithIcon
//                             color="orange"
//                             size="lg"
//                             type="modern"
//                             iconLeading={Edit04}
//                           >
//                             Help me write
//                           </BadgeWithIcon>
//                         </button>
//                         <button className="cursor-pointer rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
//                           <BadgeWithIcon
//                             color="gray"
//                             size="lg"
//                             type="modern"
//                             iconLeading={Stars02}
//                           >
//                             More
//                           </BadgeWithIcon>
//                         </button>
//                       </div>
//                     </div>
//                     <div className="flex flex-col px-4 pb-4 md:px-5 md:pb-5">
//                       <MessageActionAdvanced />
//                     </div>
//                   </div>
//                 </Dialog>
//               </Modal>
//             </ModalOverlay>
//           </AriaDialogTrigger>
//         </div>
//       );
//     };

//     return <ModalsExamplesComponent />;
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: 'Basic modal examples with different layouts and content types.',
//       },
//     },
//   },
// };

// Stacked Left Aligned
export const StackedLeftAligned: Story = {
    render: () => {
        const StackedLeftAlignedComponent = () => {
            const [isOpen, setIsOpen] = useModalState();
            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3" />
                                    <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <div className="relative w-max">
                                            <FeaturedIcon color="success" size="lg" theme="light" icon={CheckCircle} />

                                            <BackgroundPattern
                                                pattern="circle"
                                                size="sm"
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                            />
                                        </div>
                                        <div className="z-10 flex flex-col gap-0.5">
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Blog post published
                                            </AriaHeading>
                                            <p className="text-sm text-tertiary max-sm:hidden">
                                                This blog post has been published. Team members will be able to edit this post and republish changes.
                                            </p>
                                            <p className="text-sm text-tertiary sm:hidden">
                                                This blog post has been published. Team members will be able to edit this post.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 *:grow sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                                        <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                            Confirm
                                        </Button>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };

        return <StackedLeftAlignedComponent />;
    },
};

// Warning Stacked Left Aligned
export const WarningStackedLeftAligned: Story = {
    render: () => {
        const WarningStackedLeftAlignedComponent = () => {
            const [isOpen, setIsOpen] = useModalState();
            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3" />
                                    <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <div className="relative w-max">
                                            <FeaturedIcon color="warning" size="lg" theme="light" icon={Save01} />

                                            <BackgroundPattern
                                                pattern="circle"
                                                size="sm"
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                            />
                                        </div>
                                        <div className="z-10 flex flex-col gap-0.5">
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Unsaved changes
                                            </AriaHeading>
                                            <p className="text-sm text-tertiary">Do you want to save or discard changes?</p>
                                        </div>
                                    </div>
                                    <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 *:grow sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                                        <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                            Discard
                                        </Button>
                                        <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                            Save changes
                                        </Button>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };

        return <WarningStackedLeftAlignedComponent />;
    },
};

// Destructive Stacked Left Aligned
export const DestructiveStackedLeftAligned: Story = {
    render: () => {
        const DestructiveStackedLeftAlignedComponent = () => {
            const [isOpen, setIsOpen] = useModalState();
            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3" />
                                    <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <div className="relative w-max">
                                            <FeaturedIcon color="error" size="lg" theme="light" icon={Trash01} />

                                            <BackgroundPattern
                                                pattern="circle"
                                                size="sm"
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                            />
                                        </div>
                                        <div className="z-10 flex flex-col gap-0.5">
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Delete blog post
                                            </AriaHeading>
                                            <p className="text-sm text-tertiary">Are you sure you want to delete this post? This action cannot be undone.</p>
                                        </div>
                                    </div>
                                    <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 *:grow sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                                        <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button color="primary-destructive" size="md" onClick={() => setIsOpen(false)}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };

        return <DestructiveStackedLeftAlignedComponent />;
    },
};

// Horizontal Layout
export const Horizontal: Story = {
    render: () => {
        const HorizontalComponent = () => {
            const [isOpen, setIsOpen] = useModalState();
            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-136">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3 z-20" />
                                    <div className="flex flex-col gap-4 px-4 pt-5 sm:flex-row sm:px-6 sm:pt-6">
                                        <div className="relative size-max">
                                            <FeaturedIcon color="success" size="lg" theme="light" icon={CheckCircle} />

                                            <BackgroundPattern
                                                pattern="circle"
                                                size="sm"
                                                className="absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
                                            />
                                        </div>
                                        <div className="relative flex flex-col gap-0.5">
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Blog post published
                                            </AriaHeading>
                                            <p className="text-sm text-tertiary sm:hidden">
                                                This blog post has been published. Team members will be able to edit this post.
                                            </p>
                                            <p className="hidden text-sm text-tertiary sm:flex">
                                                This blog post has been published. Team members will be able to edit this post and republish changes.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="relative flex flex-1 flex-col-reverse gap-3 p-4 pt-6 sm:flex-row sm:items-center sm:px-6 sm:pt-8 sm:pb-6">
                                        <Checkbox label="Don't show again" id="remember-me-checkbox" />
                                        <Button color="secondary" size="md" onClick={() => setIsOpen(false)} className="sm:ml-auto">
                                            Cancel
                                        </Button>
                                        <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                            Confirm
                                        </Button>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };

        return <HorizontalComponent />;
    },
};
// Warning Horizontal
export const WarningHorizontal: Story = {
    render: () => {
        const WarningHorizontalComponent = () => {
            const [isOpen, setIsOpen] = useModalState();
            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-136">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3 z-20" />
                                    <div className="flex flex-col gap-4 px-4 pt-5 sm:flex-row sm:px-6 sm:pt-6">
                                        <div className="relative size-max">
                                            <FeaturedIcon color="warning" size="lg" theme="light" icon={Save01} />

                                            <BackgroundPattern
                                                pattern="circle"
                                                size="sm"
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                            />
                                        </div>
                                        <div className="relative flex flex-col gap-0.5">
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Unsaved changes
                                            </AriaHeading>
                                            <p className="text-sm text-tertiary sm:hidden">Do you want to save or discard changes?</p>
                                            <p className="hidden text-sm text-tertiary sm:flex">Do you want to save or discard changes?</p>
                                        </div>
                                    </div>
                                    <div className="relative flex flex-1 flex-col-reverse gap-3 p-4 pt-6 sm:flex-row sm:items-center sm:px-6 sm:pt-8 sm:pb-6">
                                        <Checkbox label="Don't show again" id="remember-me-checkbox" />
                                        <Button color="secondary" size="md" onClick={() => setIsOpen(false)} className="sm:ml-auto">
                                            Discard
                                        </Button>
                                        <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                            Save changes
                                        </Button>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };

        return <WarningHorizontalComponent />;
    },
};

// Destructive Horizontal
export const DestructiveHorizontal: Story = {
    render: () => {
        const DestructiveHorizontalComponent = () => {
            const [isOpen, setIsOpen] = useModalState();
            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-136">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3 z-20" />
                                    <div className="flex flex-col gap-4 px-4 pt-5 sm:flex-row sm:px-6 sm:pt-6">
                                        <div className="relative size-max">
                                            <FeaturedIcon color="error" size="lg" theme="light" icon={Trash01} />

                                            <BackgroundPattern
                                                pattern="circle"
                                                size="sm"
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                            />
                                        </div>
                                        <div className="relative flex flex-col gap-0.5">
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Delete blog post
                                            </AriaHeading>
                                            <p className="text-sm text-tertiary">Are you sure you want to delete this post? This action cannot be undone.</p>
                                        </div>
                                    </div>
                                    <div className="relative flex flex-1 flex-col-reverse gap-3 p-4 pt-6 sm:flex-row sm:items-center sm:px-6 sm:pt-8 sm:pb-6">
                                        <Checkbox label="Don't show again" id="remember-me-checkbox" />
                                        <Button color="secondary" size="md" onClick={() => setIsOpen(false)} className="sm:ml-auto">
                                            Cancel
                                        </Button>
                                        <Button color="primary-destructive" size="md" onClick={() => setIsOpen(false)}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };

        return <DestructiveHorizontalComponent />;
    },
};

// Centered Photo
export const CenteredPhoto: Story = {
    render: () => {
        const CenteredPhotoComponent = () => {
            const [isOpen, setIsOpen] = useModalState();
            const { copy, copied } = useClipboard();
            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100">
                                    <div className="px-4 pt-4 sm:px-6 sm:pt-6">
                                        <img
                                            className="aspect-4/3 w-full max-w-88 self-stretch rounded-lg object-cover object-center"
                                            src="https://www.untitledui.com/application/plants.webp"
                                            alt="Flowers for Modal"
                                        />
                                    </div>
                                    <div className="flex flex-col items-center justify-center gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <div className="z-10 flex flex-col items-center justify-center gap-0.5">
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Blog post published
                                            </AriaHeading>
                                            <p className="text-center text-sm text-tertiary">
                                                This blog post has been published. Team members will be able to edit this post and republish changes.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 *:grow sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                                        <Button
                                            color="secondary"
                                            size="md"
                                            onClick={() => copy("https://www.untitledui.com/")}
                                            iconLeading={copied ? Check : Copy01}
                                        >
                                            {copied ? "Copied" : "Copy link"}
                                        </Button>
                                        <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                            Finish
                                        </Button>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };

        return <CenteredPhotoComponent />;
    },
};

// Centered Photo Carousel
export const CenteredPhotoCarousel: Story = {
    render: () => {
        const CenteredPhotoCarouselComponent = () => {
            const [isOpen, setIsOpen] = useModalState();
            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <Carousel.Root className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100">
                                    <div className="px-4 pt-4 sm:px-6 sm:pt-6">
                                        <Carousel.Content className="gap-2 rounded-lg">
                                            <Carousel.Item className="rounded-lg bg-tertiary">
                                                <MetricsChart04
                                                    title="2,000"
                                                    subtitle="View 24 hours"
                                                    change="100%"
                                                    changeTrend="positive"
                                                    changeDescription="vs last month"
                                                />
                                            </Carousel.Item>
                                            <Carousel.Item className="rounded-lg bg-tertiary">
                                                <MetricsChart04
                                                    title="2,000"
                                                    subtitle="View 24 hours"
                                                    change="80%"
                                                    changeTrend="negative"
                                                    changeDescription="vs last month"
                                                />
                                            </Carousel.Item>
                                        </Carousel.Content>
                                    </div>
                                    <div className="flex flex-col items-center justify-center gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <div className="z-10 flex flex-col items-center justify-center gap-0.5">
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Welcome to your dashboard
                                            </AriaHeading>
                                            <p className="text-center text-sm text-tertiary">
                                                We&apos;re glad to have you onboard. Here are some quick tips to get you up and running.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="h-5 w-full" />

                                    <div className="absolute left-1/2 z-10 -translate-x-1/2 overflow-visible">
                                        <Carousel.IndicatorGroup className="flex gap-2 rounded-full bg-alpha-white/90 px-3 backdrop-blur-xs">
                                            {({ index }) => (
                                                <Carousel.Indicator
                                                    index={index}
                                                    className={({ isSelected }) =>
                                                        cx(
                                                            "size-2 rounded-full transition-colors",
                                                            isSelected ? "bg-brand-solid" : "bg-quaternary hover:bg-tertiary",
                                                        )
                                                    }
                                                />
                                            )}
                                        </Carousel.IndicatorGroup>
                                    </div>

                                    <CarouselContext.Consumer>
                                        {(context) => (
                                            <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 *:grow sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                                                <Button
                                                    size="md"
                                                    color="secondary"
                                                    onClick={() => (context?.canScrollPrev ? context?.scrollPrev() : setIsOpen(false))}
                                                >
                                                    {context?.canScrollPrev ? "Back" : "Skip"}
                                                </Button>
                                                <Button
                                                    size="md"
                                                    color="primary"
                                                    onClick={() => (context?.canScrollNext ? context?.scrollNext() : setIsOpen(false))}
                                                >
                                                    {context?.canScrollNext ? "Next" : "Finish"}
                                                </Button>
                                            </div>
                                        )}
                                    </CarouselContext.Consumer>
                                </Carousel.Root>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };

        return <CenteredPhotoCarouselComponent />;
    },
};

// Centered Video Carousel
export const CenteredVideoCarousel: Story = {
    render: () => {
        const CenteredVideoCarouselComponent = () => {
            const [isOpen, setIsOpen] = useModalState();
            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <Carousel.Root className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-160">
                                    <div className="px-4 pt-4 sm:px-6 sm:pt-6">
                                        <Carousel.Content className="gap-2 rounded-lg">
                                            <Carousel.Item>
                                                <VideoPlayer
                                                    size="md"
                                                    src="https://www.untitledui.com/videos/untitled-ui-demo.mp4"
                                                    thumbnailUrl="https://www.untitledui.com/application/video-thumbnail.webp"
                                                    className="w-full max-w-148 overflow-hidden rounded-lg"
                                                    thumbnailButtonClassName="max-md:bg-transparent max-md:backdrop-blur-none"
                                                />
                                            </Carousel.Item>
                                            <Carousel.Item>
                                                <VideoPlayer
                                                    size="md"
                                                    src="https://www.untitledui.com/videos/untitled-ui-demo.mp4"
                                                    thumbnailUrl="https://www.untitledui.com/application/video-thumbnail.webp"
                                                    className="w-full max-w-148 overflow-hidden rounded-lg"
                                                    thumbnailButtonClassName="max-md:bg-transparent max-md:backdrop-blur-none"
                                                />
                                            </Carousel.Item>
                                            <Carousel.Item>
                                                <VideoPlayer
                                                    size="md"
                                                    src="https://www.untitledui.com/videos/untitled-ui-demo.mp4"
                                                    thumbnailUrl="https://www.untitledui.com/application/video-thumbnail.webp"
                                                    className="w-full max-w-148 overflow-hidden rounded-lg"
                                                    thumbnailButtonClassName="max-md:bg-transparent max-md:backdrop-blur-none"
                                                />
                                            </Carousel.Item>
                                            <Carousel.Item>
                                                <VideoPlayer
                                                    size="md"
                                                    src="https://www.untitledui.com/videos/untitled-ui-demo.mp4"
                                                    thumbnailUrl="https://www.untitledui.com/application/video-thumbnail.webp"
                                                    className="w-full max-w-148 overflow-hidden rounded-lg"
                                                    thumbnailButtonClassName="max-md:bg-transparent max-md:backdrop-blur-none"
                                                />
                                            </Carousel.Item>
                                        </Carousel.Content>
                                    </div>
                                    <div className="flex flex-col items-center justify-center gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <div className="z-10 flex w-full flex-col items-center justify-center gap-0.5">
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Welcome to your dashboard
                                            </AriaHeading>
                                            <p className="self-stretch text-center text-sm text-tertiary">Here are some tips to get you up and running.</p>
                                        </div>
                                    </div>
                                    <div className="h-5 w-full" />

                                    <div className="absolute left-1/2 z-10 -translate-x-1/2 overflow-visible">
                                        <Carousel.IndicatorGroup className="flex gap-2 rounded-full bg-alpha-white/90 px-3 backdrop-blur-xs">
                                            {({ index }) => (
                                                <Carousel.Indicator
                                                    index={index}
                                                    className={({ isSelected }) =>
                                                        cx(
                                                            "size-2 rounded-full transition-colors",
                                                            isSelected ? "bg-brand-solid" : "bg-quaternary hover:bg-tertiary",
                                                        )
                                                    }
                                                />
                                            )}
                                        </Carousel.IndicatorGroup>
                                    </div>

                                    <CarouselContext.Consumer>
                                        {(context) => (
                                            <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 *:grow sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                                                <Button
                                                    size="md"
                                                    color="secondary"
                                                    onClick={() => (context?.canScrollPrev ? context?.scrollPrev() : setIsOpen(false))}
                                                >
                                                    {context?.canScrollPrev ? "Back" : "Skip"}
                                                </Button>
                                                <Button
                                                    size="md"
                                                    color="primary"
                                                    onClick={() => (context?.canScrollNext ? context?.scrollNext() : setIsOpen(false))}
                                                >
                                                    {context?.canScrollNext ? "Continue" : "Finish"}
                                                </Button>
                                            </div>
                                        )}
                                    </CarouselContext.Consumer>
                                </Carousel.Root>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };

        return <CenteredVideoCarouselComponent />;
    },
};

// Login Modal
export const Login: Story = {
    render: () => {
        const LoginComponent = () => {
            const [isOpen, setIsOpen] = useModalState();
            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3" />
                                    <div className="flex flex-col items-center justify-center gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <UntitledLogoMinimal className="size-8" />
                                        <div className="flex flex-col items-center justify-center gap-0.5">
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Log in to your account
                                            </AriaHeading>
                                            <p className="text-sm text-tertiary">Welcome back! Please enter your details.</p>
                                        </div>
                                    </div>
                                    <div className="h-5 w-full" />
                                    <Form
                                        id="login-form-modal"
                                        className="flex flex-col gap-5 px-4 sm:px-6"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            const data = Object.fromEntries(new FormData(e.currentTarget));
                                            console.log("Form data:", data);
                                            setIsOpen(false);
                                        }}
                                    >
                                        <div className="flex flex-col gap-4">
                                            <Input isRequired hideRequiredIndicator label="Email" name="email" placeholder="Enter your email" size="md" />
                                            <Input
                                                isRequired
                                                hideRequiredIndicator
                                                label="Password"
                                                type="password"
                                                name="password"
                                                autoComplete="current-password"
                                                placeholder="••••••••"
                                                size="md"
                                            />
                                        </div>
                                        <div className="flex justify-between">
                                            <Checkbox label="Remember for 30 days" id="remember-me-checkbox" />
                                            <Button href="#" size="md" color="link-color">
                                                Forgot password
                                            </Button>
                                        </div>
                                    </Form>
                                    <div className="flex flex-1 flex-col gap-3 p-4 pt-6 *:grow sm:px-6 sm:pt-8 sm:pb-6">
                                        <Button type="submit" form="login-form-modal" color="primary" size="lg">
                                            Sign in
                                        </Button>
                                        <SocialButton social="google" theme="color">
                                            Sign in with Google
                                        </SocialButton>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };

        return <LoginComponent />;
    },
};

// Signup 01
export const Signup01: Story = {
    render: () => {
        const Signup01Component = () => {
            const [isOpen, setIsOpen] = useModalState();
            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3" />
                                    <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <UntitledLogoMinimal className="size-8" />
                                        <div className="flex flex-col gap-0.5">
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Sign up
                                            </AriaHeading>
                                            <p className="text-sm text-tertiary">Start your 30-day free trial.</p>
                                        </div>
                                    </div>
                                    <div className="h-5 w-full" />
                                    <Form
                                        id="signup-form-modal"
                                        className="flex flex-col gap-4 px-4 sm:px-6"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            const data = Object.fromEntries(new FormData(e.currentTarget));
                                            console.log("Form data:", data);
                                            setIsOpen(false);
                                        }}
                                    >
                                        <Input
                                            isRequired
                                            hideRequiredIndicator
                                            label="Name"
                                            name="name"
                                            placeholder="Enter your name"
                                            size="md"
                                            autoComplete="name"
                                        />
                                        <Input
                                            isRequired
                                            hideRequiredIndicator
                                            label="Email"
                                            name="email"
                                            placeholder="Enter your email"
                                            size="md"
                                            autoComplete="email"
                                        />
                                        <Input
                                            isRequired
                                            hideRequiredIndicator
                                            label="Password"
                                            type="password"
                                            name="password"
                                            autoComplete="new-password"
                                            placeholder="Create a password"
                                            hint="Must be at least 8 characters."
                                            size="md"
                                            minLength={8}
                                        />
                                    </Form>
                                    <div className="flex flex-1 flex-col gap-3 p-4 pt-6 *:grow sm:px-6 sm:pt-8 sm:pb-6">
                                        <Button type="submit" form="signup-form-modal" color="primary" size="lg">
                                            Sign in
                                        </Button>

                                        <SocialButton social="google" theme="brand">
                                            Sign in with Google
                                        </SocialButton>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };

        return <Signup01Component />;
    },
};

// Signup 02
export const Signup02: Story = {
    render: () => {
        const Signup02Component = () => {
            const [isOpen, setIsOpen] = useModalState();
            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3" />
                                    <div className="flex flex-col items-center justify-center gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <UntitledLogoMinimal className="size-8" />
                                        <div className="flex flex-col items-center justify-center gap-0.5">
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Create an account
                                            </AriaHeading>
                                            <p className="text-sm text-tertiary">Start your free 30-day trial. Cancel anytime.</p>
                                        </div>
                                    </div>
                                    <div className="h-5 w-full" />
                                    <div className="flex flex-col gap-4 px-4 pb-4 sm:gap-5 sm:px-6 sm:pb-6">
                                        <Form
                                            className="flex flex-col gap-4"
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                const data = Object.fromEntries(new FormData(e.currentTarget));
                                                console.log("Form data:", data);
                                                setIsOpen(false);
                                            }}
                                        >
                                            <Input isRequired hideRequiredIndicator name="email" placeholder="Enter your email" size="md" />
                                            <Button type="submit" size="lg" color="primary">
                                                Get started
                                            </Button>
                                        </Form>
                                        <ContentDivider type="single-line">
                                            <span className="text-sm font-medium text-tertiary">OR</span>
                                        </ContentDivider>
                                        <div className="flex flex-col gap-3">
                                            <SocialButton social="google" theme="color">
                                                Sign up with Google
                                            </SocialButton>
                                            <SocialButton social="facebook" theme="color">
                                                Sign up with Facebook
                                            </SocialButton>
                                            <SocialButton social="apple" theme="color">
                                                Sign up with Apple
                                            </SocialButton>
                                        </div>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };

        return <Signup02Component />;
    },
};

// Access Request
export const AccessRequest: Story = {
    render: () => {
        const AccessRequestComponent = () => {
            const [isOpen, setIsOpen] = useModalState();
            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3" />
                                    <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <div className="relative w-max">
                                            <FeaturedIcon color="gray" size="lg" theme="modern" icon={UserPlus01} />

                                            <BackgroundPattern
                                                pattern="circle"
                                                size="sm"
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                            />
                                        </div>
                                        <div className="z-10 flex flex-col gap-0.5">
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Candice has requested edit access
                                            </AriaHeading>
                                            <p className="text-sm text-tertiary">
                                                One of your team has requested edit access to your project&nbsp;
                                                <span className="text-sm font-semibold text-brand-secondary">Marketing Website Design.</span>
                                                &nbsp;
                                            </p>
                                        </div>
                                    </div>
                                    <div className="h-5 w-full" />
                                    <div className="px-4 sm:px-6">
                                        <AvatarLabelGroup
                                            size="md"
                                            src="https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80"
                                            title="Candice Wu"
                                            subtitle="candice@untitledui.com"
                                        />
                                    </div>
                                    <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 sm:flex-row sm:justify-end sm:px-6 sm:pt-8 sm:pb-6">
                                        <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                            Confirm
                                        </Button>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };

        return <AccessRequestComponent />;
    },
};
// Email Invite
export const EmailInvite: Story = {
    render: () => {
        const EmailInviteComponent = () => {
            const [isOpen, setIsOpen] = useModalState();
            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3" />
                                    <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <div className="relative w-max">
                                            <FeaturedIcon color="gray" size="lg" theme="modern" icon={UsersPlus} />

                                            <BackgroundPattern
                                                pattern="circle"
                                                size="sm"
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                            />
                                        </div>
                                        <div className="z-10 flex flex-col gap-0.5">
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Invite collaborators
                                            </AriaHeading>
                                            <p className="text-sm text-tertiary">
                                                Your new project has been created. Invite colleagues to collaborate on this project.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="h-5 w-full" />
                                    <div className="flex flex-col items-start justify-start gap-3 px-4 sm:px-6">
                                        <Input size="sm" label="Email address" placeholder="you@untitledui.com" icon={Mail01} />
                                        <Input size="sm" placeholder="you@untitledui.com" icon={Mail01} />
                                        <Button size="md" color="link-color" iconLeading={Plus}>
                                            Add another
                                        </Button>
                                    </div>
                                    <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 *:grow sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                                        <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                            Send invites
                                        </Button>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };

        return <EmailInviteComponent />;
    },
};

const people = [
    {
        id: "@phoenix",
        label: "Phoenix Baker",
        avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
    },
    {
        id: "@olivia",
        label: "Olivia Rhye",
        avatarUrl: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
    },
    {
        id: "@lana",
        label: "Lana Steiner",
        avatarUrl: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80",
    },
    {
        id: "@demi",
        label: "Demi Wilkinson",
        avatarUrl: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80",
    },
    {
        id: "@candice",
        label: "Candice Wu",
        avatarUrl: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80",
    },
    {
        id: "@natali",
        label: "Natali Craig",
        avatarUrl: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
    },
    {
        id: "@abraham",
        label: "Abraham Baker",
        avatarUrl: "https://www.untitledui.com/images/avatars/abraham-baker?fm=webp&q=80",
    },
    {
        id: "@adem",
        label: "Adem Lane",
        avatarUrl: "https://www.untitledui.com/images/avatars/adem-lane?fm=webp&q=80",
    },
    {
        id: "@jackson",
        label: "Jackson Reed",
        avatarUrl: "https://www.untitledui.com/images/avatars/jackson-reed?fm=webp&q=80",
    },
    {
        id: "@jessie",
        label: "Jessie Meyton",
        avatarUrl: "https://www.untitledui.com/images/avatars/jessie-meyton?fm=webp&q=80",
    },
];

// User Invite
export const UserInvite: Story = {
    render: () => {
        const UserInviteComponent = () => {
            const [isOpen, setIsOpen] = useModalState();
            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3" />
                                    <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <div className="relative w-max">
                                            <FeaturedIcon color="gray" size="lg" theme="modern" icon={UsersPlus} />

                                            <BackgroundPattern
                                                pattern="circle"
                                                size="sm"
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                            />
                                        </div>
                                        <div className="z-10 flex flex-col gap-0.5">
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Share with people
                                            </AriaHeading>
                                            <p className="text-sm text-tertiary">The following users have access to this project:</p>
                                        </div>
                                    </div>
                                    <div className="h-5 w-full" />
                                    <div className="relative flex flex-col gap-4 px-4 sm:gap-5 sm:px-6">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex w-full flex-row items-center gap-3">
                                                <AvatarLabelGroup
                                                    size="md"
                                                    src="https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80"
                                                    title="Candice Wu"
                                                    subtitle="candice@untitledui.com"
                                                />
                                                <Button size="sm" color="link-destructive" className="ml-auto">
                                                    Remove
                                                </Button>
                                            </div>
                                            <div className="flex w-full flex-row items-center gap-3">
                                                <AvatarLabelGroup size="md" initials="DW" title="Demi Wilkinson" subtitle="demi@untitledui.com" />
                                                <Button size="sm" color="link-destructive" className="ml-auto">
                                                    Remove
                                                </Button>
                                            </div>
                                            <div className="flex w-full flex-row items-center gap-3">
                                                <AvatarLabelGroup
                                                    size="md"
                                                    src="https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80"
                                                    title="Drew Cano"
                                                    subtitle="drew@untitledui.com"
                                                />
                                                <Button size="sm" color="link-destructive" className="ml-auto">
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>

                                        <Select label="Team member" placeholder="Select team member" placeholderIcon={User01} size="md" items={people}>
                                            {(item) => (
                                                <Select.Item key={item.id} id={item.id} avatarUrl={item.avatarUrl}>
                                                    {item.label}
                                                </Select.Item>
                                            )}
                                        </Select>
                                    </div>
                                    <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 *:grow sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                                        <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                            Done
                                        </Button>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };

        return <UserInviteComponent />;
    },
};

// Stacked with team
export const StackedWithTeam: Story = {
    render: () => {
        const StackedWithTeamComponent = () => {
            const [isOpen, setIsOpen] = useModalState();

            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100">
                                    <div className="flex flex-row items-end justify-center -space-x-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <Avatar
                                            size="lg"
                                            src="https://www.untitledui.com/images/avatars/transparent/caitlyn-king?bg=%23E0E0E0"
                                            alt="Caitlyn King"
                                        />
                                        <div className="z-10 inline-flex rounded-full ring-[1.5px] ring-bg-primary">
                                            <Avatar
                                                size="xl"
                                                src="https://www.untitledui.com/images/avatars/transparent/sienna-hewitt?bg=%23E0E0E0"
                                                alt="Sienna Hewitt"
                                            />
                                        </div>
                                        <Avatar
                                            size="lg"
                                            src="https://www.untitledui.com/images/avatars/transparent/olly-schroeder?bg=%23E0E0E0"
                                            alt="Olly Schroeder"
                                        />
                                    </div>
                                    <div className="z-10 flex flex-col items-center justify-center gap-0.5 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <AriaHeading slot="title" className="text-center text-md font-semibold text-primary">
                                            You&apos;ve been added to the team!
                                        </AriaHeading>
                                        <p className="text-center text-sm text-tertiary">
                                            Thanks for accepting the invite. You&apos;ve now been added to the team as an editor.
                                        </p>
                                    </div>

                                    <div className="pt-6 sm:pt-8">
                                        <div className="z-10 flex flex-1 flex-col-reverse gap-3 border-t border-secondary p-4 *:grow sm:grid sm:grid-cols-2 sm:p-6">
                                            <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                                Cancel
                                            </Button>
                                            <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                                Get started
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };

        return <StackedWithTeamComponent />;
    },
};

// Stacked with team and link
export const StackedWithTeamAndLink: Story = {
    render: () => {
        const StackedWithTeamAndLinkComponent = () => {
            const [isOpen, setIsOpen] = useModalState();
            const [value, setValue] = useState("join.untitledui.com/project");
            const { copy, copied } = useClipboard();

            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100">
                                    <div className="flex flex-row items-end justify-center -space-x-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <Avatar
                                            size="lg"
                                            src="https://www.untitledui.com/images/avatars/transparent/caitlyn-king?bg=%23E0E0E0"
                                            alt="Caitlyn King"
                                        />
                                        <div className="relative z-10 inline-flex rounded-full ring-[1.5px] ring-bg-primary">
                                            <Avatar
                                                size="xl"
                                                src="https://www.untitledui.com/images/avatars/transparent/sienna-hewitt?bg=%23E0E0E0"
                                                alt="Sienna Hewitt"
                                            />
                                        </div>
                                        <Avatar
                                            size="lg"
                                            src="https://www.untitledui.com/images/avatars/transparent/olly-schroeder?bg=%23E0E0E0"
                                            alt="Olly Schroeder"
                                        />
                                    </div>
                                    <div className="z-10 flex flex-col items-center justify-center gap-0.5 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <AriaHeading slot="title" className="text-center text-md font-semibold text-primary">
                                            Invite your team
                                        </AriaHeading>
                                        <p className="text-center text-sm text-tertiary">
                                            You&apos;ve created a new project! Invite colleagues to collaborate on this project.
                                        </p>
                                    </div>
                                    <div className="h-5 w-full" />
                                    <div className="flex flex-row items-end justify-end gap-1 px-4 sm:px-6">
                                        <Input isReadOnly label="Share link" size="sm" value={value} onChange={setValue} />
                                        <Button size="sm" color="tertiary" onClick={() => copy(value)} iconLeading={copied ? Check : Copy01} />
                                    </div>
                                    <div className="pt-6 sm:pt-8">
                                        <div className="z-10 flex flex-1 flex-col-reverse gap-3 border-t border-secondary p-4 *:grow sm:grid sm:grid-cols-2 sm:p-6">
                                            <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                                Cancel
                                            </Button>
                                            <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                                Continue
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };
        return <StackedWithTeamAndLinkComponent />;
    },
};

// Stacked with team and invites
export const StackedWithTeamAndInvites: Story = {
    render: () => {
        const StackedWithTeamAndInvitesComponent = () => {
            const [isOpen, setIsOpen] = useModalState();

            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100">
                                    <div className="flex flex-row items-end justify-center -space-x-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <Avatar size="lg" src="https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80" alt="Phoenix Baker" />
                                        <div className="relative z-10 inline-flex rounded-full ring-[1.5px] ring-bg-primary">
                                            <Avatar size="xl" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" alt="Olivia Rhye" />
                                        </div>
                                        <Avatar size="lg" src="https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80" alt="Lana Steiner" />
                                    </div>
                                    <div className="z-10 flex flex-col items-center justify-center gap-0.5 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <AriaHeading slot="title" className="text-center text-md font-semibold text-primary">
                                            Add your team members
                                        </AriaHeading>
                                        <p className="text-center text-sm text-tertiary">
                                            You&apos;ve created a new project! Invite colleagues to collaborate on this project.
                                        </p>
                                    </div>
                                    <div className="h-5 w-full" />
                                    <div className="flex flex-col gap-3 px-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-row items-center justify-center gap-3">
                                                <Checkbox defaultSelected />
                                                <AvatarLabelGroup
                                                    size="md"
                                                    src="https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80"
                                                    title="Candice Wu"
                                                    subtitle="@candice"
                                                />
                                            </div>
                                            <p className="text-xs font-medium text-tertiary">Admin</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-row items-center justify-center gap-3">
                                                <Checkbox defaultSelected />
                                                <AvatarLabelGroup
                                                    size="md"
                                                    src="https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80"
                                                    title="Demi Wilkinson"
                                                    subtitle="@demi"
                                                />
                                            </div>
                                            <p className="text-xs font-medium text-tertiary">Admin</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-row items-center justify-center gap-3">
                                                <Checkbox defaultSelected />
                                                <AvatarLabelGroup
                                                    size="md"
                                                    src="https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80"
                                                    title="Drew Cano"
                                                    subtitle="@drew"
                                                />
                                            </div>
                                            <p className="text-xs font-medium text-tertiary">Editor</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-row items-center justify-center gap-3">
                                                <Checkbox defaultSelected />
                                                <AvatarLabelGroup
                                                    size="md"
                                                    src="https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80"
                                                    title="Natali Crag"
                                                    subtitle="@natali"
                                                />
                                            </div>
                                            <p className="text-xs font-medium text-tertiary">Editor</p>
                                        </div>
                                    </div>
                                    <div className="pt-6 sm:pt-8">
                                        <div className="z-10 flex flex-1 flex-col-reverse gap-3 border-t border-secondary p-4 *:grow sm:grid sm:grid-cols-2 sm:p-6">
                                            <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                                Cancel
                                            </Button>
                                            <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                                Add to project
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };
        return <StackedWithTeamAndInvitesComponent />;
    },
};

// Verification Code
export const VerificationCode: Story = {
    render: () => {
        const VerificationCodeComponent = () => {
            const [isOpen, setIsOpen] = useModalState();
            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full max-w-102 overflow-hidden rounded-2xl bg-primary shadow-xl">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3 z-20" />
                                    <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <div className="relative flex w-full items-center justify-center">
                                            <FeaturedIcon color="brand" size="lg" theme="light" icon={Mail01} />

                                            <BackgroundPattern
                                                pattern="circle"
                                                size="sm"
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                            />
                                        </div>
                                        <div className="z-10 flex flex-col items-center justify-center gap-0.5">
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Please check your email.
                                            </AriaHeading>
                                            <p className="text-center text-sm text-tertiary">
                                                We&apos;ve sent a code to&nbsp;
                                                <span className="text-sm font-semibold">olivia@untitledui.com</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="h-5 w-full" />
                                    <div className="relative z-10 flex flex-col gap-1.5 px-[31.5px] sm:px-6.5">
                                        <PinInput size="md" className="max-sm:hidden">
                                            <PinInput.Group maxLength={4}>
                                                <PinInput.Slot index={0} />
                                                <PinInput.Slot index={1} />
                                                <PinInput.Slot index={2} />
                                                <PinInput.Slot index={3} />
                                            </PinInput.Group>

                                            <PinInput.Description>
                                                Didn&apos;t get a code?&nbsp;
                                                <button className="cursor-pointer rounded-xs underline underline-offset-3 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                                    Click to resend
                                                </button>
                                                .
                                            </PinInput.Description>
                                        </PinInput>
                                        <PinInput size="sm" className="sm:hidden">
                                            <PinInput.Group maxLength={4}>
                                                <PinInput.Slot index={0} />
                                                <PinInput.Slot index={1} />
                                                <PinInput.Slot index={2} />
                                                <PinInput.Slot index={3} />
                                            </PinInput.Group>

                                            <PinInput.Description>
                                                Didn&apos;t get a code?&nbsp;
                                                <button className="cursor-pointer rounded-xs underline underline-offset-3 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                                    Click to resend
                                                </button>
                                                .
                                            </PinInput.Description>
                                        </PinInput>
                                    </div>
                                    <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 *:grow sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                                        <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                            Verify
                                        </Button>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };
        return <VerificationCodeComponent />;
    },
};
// Two Factor Code
export const TwoFactorCode: Story = {
    render: () => {
        const TwoFactorCodeComponent = () => {
            const [isOpen, setIsOpen] = useModalState();
            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full max-w-128 overflow-hidden rounded-2xl bg-primary shadow-xl">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3" />
                                    <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <div className="relative w-max">
                                            <FeaturedIcon color="gray" size="lg" theme="modern" icon={Lock01} />

                                            <BackgroundPattern
                                                pattern="circle"
                                                size="sm"
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                            />
                                        </div>
                                        <div className="z-10 flex flex-col gap-0.5">
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Set up two-factor authentication
                                            </AriaHeading>
                                            <p className="text-sm text-tertiary">
                                                To authorize transactions, please scan this QR code with your Google Authenticator App and enter the
                                                verification code below.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="h-5 w-full" />
                                    <div className="flex flex-col gap-4 px-4 sm:gap-5 sm:px-6">
                                        <div className="relative flex w-full items-center justify-center rounded-lg bg-secondary p-5">
                                            <QRCode value="https://www.untitledui.com/" size="lg" className="hidden sm:flex" />
                                            <QRCode value="https://www.untitledui.com/" size="md" className="flex sm:hidden" />
                                            <GradientScan className="md:max-w-[calc(100%-40px)]" />
                                        </div>
                                        <div className="relative z-10 flex flex-col gap-1.5">
                                            <PinInput size="sm">
                                                <PinInput.Label>Verification code</PinInput.Label>
                                                <PinInput.Group maxLength={6} containerClassName="max-sm:h-max">
                                                    <PinInput.Slot
                                                        index={0}
                                                        className="text-ellipsis max-[400px]:size-max max-sm:px-3.5 max-sm:py-2.5 max-sm:text-display-xs max-sm:font-medium"
                                                    />
                                                    <PinInput.Slot
                                                        index={1}
                                                        className="text-ellipsis max-[400px]:size-max max-sm:px-3.5 max-sm:py-2.5 max-sm:text-display-xs max-sm:font-medium"
                                                    />
                                                    <PinInput.Slot
                                                        index={2}
                                                        className="text-ellipsis max-[400px]:size-max max-sm:px-3.5 max-sm:py-2.5 max-sm:text-display-xs max-sm:font-medium"
                                                    />
                                                    <PinInput.Separator className="text-center text-ellipsis max-[400px]:size-max max-sm:py-2.5 max-sm:text-display-xs max-sm:font-medium" />
                                                    <PinInput.Slot
                                                        index={3}
                                                        className="text-ellipsis max-[400px]:size-max max-sm:px-3.5 max-sm:py-2.5 max-sm:text-display-xs max-sm:font-medium"
                                                    />
                                                    <PinInput.Slot
                                                        index={4}
                                                        className="text-ellipsis max-[400px]:size-max max-sm:px-3.5 max-sm:py-2.5 max-sm:text-display-xs max-sm:font-medium"
                                                    />
                                                    <PinInput.Slot
                                                        index={5}
                                                        className="text-ellipsis max-[400px]:size-max max-sm:px-3.5 max-sm:py-2.5 max-sm:text-display-xs max-sm:font-medium"
                                                    />
                                                </PinInput.Group>
                                                <PinInput.Description>
                                                    Didn&apos;t get a code?&nbsp;
                                                    <button className="cursor-pointer rounded-xs underline underline-offset-3 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                                        Click to resend
                                                    </button>
                                                    .
                                                </PinInput.Description>
                                            </PinInput>
                                        </div>
                                    </div>
                                    <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 *:grow sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                                        <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                            Confirm
                                        </Button>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };
        return <TwoFactorCodeComponent />;
    },
};

// Password Prompt
export const PasswordPrompt: Story = {
    render: () => {
        const PasswordPromptComponent = () => {
            const [isOpen, setIsOpen] = useModalState();
            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3" />
                                    <div className="flex flex-col items-center justify-center gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <div className="relative size-max">
                                            <FeaturedIcon size="lg" color="brand" theme="light" icon={Shield01} />
                                            <BackgroundPattern
                                                pattern="circle"
                                                size="sm"
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                            />
                                        </div>
                                        <div className="z-10 flex flex-col items-center justify-center gap-0.5">
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Please enter your password
                                            </AriaHeading>
                                            <p className="text-sm text-tertiary">Enter your password to make this change.</p>
                                        </div>
                                    </div>
                                    <div className="h-5 w-full" />
                                    <Form
                                        id="password-prompt-form-modal"
                                        className="z-10 flex flex-col gap-4 px-4 sm:px-6"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            const data = Object.fromEntries(new FormData(e.currentTarget));
                                            console.log("Form data:", data);
                                            setIsOpen(false);
                                        }}
                                    >
                                        <Input
                                            isRequired
                                            hideRequiredIndicator
                                            label="Email or username"
                                            type="email"
                                            name="email"
                                            placeholder="Email or username"
                                            autoComplete="email"
                                            size="sm"
                                            defaultValue="olivia@untitledui.com"
                                        />
                                        <Input
                                            isRequired
                                            hideRequiredIndicator
                                            label="Password"
                                            type="password"
                                            name="password"
                                            autoComplete="current-password"
                                            placeholder="••••••••"
                                            size="sm"
                                            defaultValue="12345678"
                                        />
                                    </Form>
                                    <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 *:grow sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                                        <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" form="password-prompt-form-modal" color="primary" size="md">
                                            Verify
                                        </Button>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };
        return <PasswordPromptComponent />;
    },
};

// Payment Details
export const PaymentDetails: Story = {
    render: () => {
        const PaymentDetailsComponent = () => {
            const [isOpen, setIsOpen] = useModalState();
            const [isCvvFocused, setIsCvvFocused] = useState(false);
            const [cardDetails, setCardDetails] = useState({
                name: "Olivia Rhye",
                expiry: "06 / 2025",
                card: "1234 1234 1234 1234",
                cvv: "123",
            });
            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-120">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3" />
                                    <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <div className="relative w-max">
                                            <FeaturedIcon color="gray" size="lg" theme="modern" icon={CreditCard01} />

                                            <BackgroundPattern
                                                pattern="circle"
                                                size="sm"
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                            />
                                        </div>
                                        <div className="z-10 flex flex-col gap-0.5">
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Update payment method
                                            </AriaHeading>
                                            <p className="text-sm text-tertiary">Update your card details.</p>
                                        </div>
                                    </div>
                                    <div className="h-5 w-full" />
                                    <div className="relative grid grid-flow-row grid-cols-2 gap-4 px-4 sm:grid-cols-[1fr_112px] sm:px-6">
                                        <Input
                                            size="sm"
                                            label="Name on card"
                                            className="order-first max-sm:col-span-2"
                                            value={cardDetails.name}
                                            onChange={(value) => {
                                                setCardDetails((prev) => ({ ...prev, name: value }));
                                            }}
                                        />
                                        <Input
                                            size="sm"
                                            label="Expiry"
                                            type="tel"
                                            className="order-3 col-span-1 sm:order-2"
                                            maxLength={9}
                                            value={cardDetails.expiry}
                                            onChange={(value) => {
                                                // Remove any non-numeric characters
                                                value = value.replace(/\D/g, "");

                                                // Make sure max length is 6 characters long.
                                                value = value.slice(0, 6);

                                                if (value.length > 2) {
                                                    // Format the value as MM/YY.
                                                    value = value.slice(0, 2) + " / " + value.slice(2, 6);
                                                }

                                                setCardDetails((prev) => ({ ...prev, expiry: value }));
                                            }}
                                        />
                                        <PaymentInput
                                            size="sm"
                                            label="Card number"
                                            type="tel"
                                            className="order-2 col-span-1 max-sm:col-span-2 sm:order-3"
                                            value={cardDetails.card}
                                            onChange={(value) => {
                                                setCardDetails((prev) => ({ ...prev, card: value }));
                                            }}
                                        />
                                        <Input
                                            size="sm"
                                            label="CVV"
                                            type={isCvvFocused ? "tel" : "password"}
                                            className="order-last col-span-1"
                                            placeholder="•••"
                                            maxLength={3}
                                            value={cardDetails.cvv}
                                            onFocus={() => setIsCvvFocused(true)}
                                            onBlur={() => setIsCvvFocused(false)}
                                            onChange={(value) => {
                                                // Remove any non-numeric characters
                                                value = value.replace(/\D/g, "");

                                                // Make sure max length is 3 characters long.
                                                value = value.slice(0, 3);

                                                setCardDetails((prev) => ({ ...prev, cvv: value }));
                                            }}
                                        />
                                    </div>
                                    <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 *:grow sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                                        <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };
        return <PaymentDetailsComponent />;
    },
};

// Payment Details with Image
export const PaymentDetailsWithImage: Story = {
    render: () => {
        const PaymentDetailsWithImageComponent = () => {
            const [isOpen, setIsOpen] = useModalState();

            const [isCvvFocused, setIsCvvFocused] = useState(false);
            const [cardDetails, setCardDetails] = useState({
                name: "Olivia Rhye",
                expiry: "06 / 2025",
                card: "1234 1234 1234 1234",
                cvv: "123",
            });
            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-120">
                                    <div className="w-full px-4 pt-4 max-sm:hidden sm:px-6 sm:pt-6">
                                        <div className="relative flex w-full items-center justify-center overflow-hidden rounded-lg py-8">
                                            <img
                                                aria-hidden="true"
                                                src="https://www.untitledui.com/application/card-mockup.webp"
                                                alt="Card Mockup"
                                                className="absolute inset-0 size-full object-cover"
                                            />
                                            <CreditCard
                                                cardExpiration={cardDetails.expiry}
                                                cardHolder={cardDetails.name}
                                                cardNumber={cardDetails.card}
                                                type="transparent"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-0.5 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                            Update payment method
                                        </AriaHeading>
                                        <p className="text-sm text-tertiary">Update your card details.</p>
                                    </div>
                                    <div className="h-5 w-full" />
                                    <div className="grid grid-flow-row grid-cols-2 gap-4 px-4 sm:grid-cols-[1fr_112px] sm:px-6">
                                        <Input
                                            size="sm"
                                            label="Name on card"
                                            className="order-first max-sm:col-span-2"
                                            value={cardDetails.name}
                                            onChange={(value) => {
                                                setCardDetails((prev) => ({ ...prev, name: value }));
                                            }}
                                        />
                                        <Input
                                            size="sm"
                                            label="Expiry"
                                            type="tel"
                                            className="order-3 col-span-1 sm:order-2"
                                            maxLength={9}
                                            value={cardDetails.expiry}
                                            onChange={(value) => {
                                                // Remove any non-numeric characters.
                                                value = value.replace(/\D/g, "");

                                                // Make sure max length is 6 characters long.
                                                value = value.slice(0, 6);

                                                if (value.length > 2) {
                                                    // Format the value as MM/YY.
                                                    value = value.slice(0, 2) + " / " + value.slice(2, 6);
                                                }

                                                setCardDetails((prev) => ({ ...prev, expiry: value }));
                                            }}
                                        />
                                        <PaymentInput
                                            size="sm"
                                            label="Card number"
                                            type="tel"
                                            className="order-2 col-span-1 max-sm:col-span-2 sm:order-3"
                                            value={cardDetails.card}
                                            onChange={(value) => {
                                                setCardDetails((prev) => ({ ...prev, card: value }));
                                            }}
                                        />
                                        <Input
                                            size="sm"
                                            label="CVV"
                                            type={isCvvFocused ? "tel" : "password"}
                                            className="order-last col-span-1"
                                            placeholder="•••"
                                            maxLength={3}
                                            value={cardDetails.cvv}
                                            onFocus={() => setIsCvvFocused(true)}
                                            onBlur={() => setIsCvvFocused(false)}
                                            onChange={(value) => {
                                                // Remove any non-numeric characters.
                                                value = value.replace(/\D/g, "");

                                                // Make sure max length is 3 characters long.
                                                value = value.slice(0, 3);

                                                setCardDetails((prev) => ({ ...prev, cvv: value }));
                                            }}
                                        />
                                    </div>
                                    <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 sm:grid sm:grid-cols-2 sm:flex-row sm:px-6 sm:pt-8 sm:pb-6">
                                        <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };
        return <PaymentDetailsWithImageComponent />;
    },
};

// Plan 01
export const Plan01: Story = {
    render: () => {
        const Plan01Component = () => {
            const [isOpen, setIsOpen] = useModalState();

            const plans = [
                {
                    value: "basic",
                    title: "Basic plan",
                    secondaryTitle: "$10/month",
                    description: "Up to 10 users and 20 GB individual data.",
                    icon: LayersTwo01,
                },

                {
                    value: "business",
                    title: "Business plan",
                    secondaryTitle: "$20/month",
                    description: "Up to 20 users and 40 GB individual data.",
                    icon: LayersThree01,
                },

                {
                    value: "enterprise",
                    title: "Enterprise plan",
                    secondaryTitle: "$40/month",
                    description: "Unlimited users and unlimited individual data.",
                    icon: Zap,
                },
            ];

            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-120">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3" />
                                    <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <div className="relative w-max">
                                            <FeaturedIcon color="gray" size="lg" theme="modern" icon={CreditCardRefresh} />

                                            <BackgroundPattern
                                                pattern="circle"
                                                size="sm"
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                            />
                                        </div>
                                        <div className="z-10 flex flex-col gap-0.5">
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Change your plan
                                            </AriaHeading>
                                            <p className="text-sm text-tertiary">Flexible pricing that grows with you.</p>
                                        </div>
                                    </div>
                                    <div className="h-5 w-full" />
                                    <div className="px-4 sm:px-6">
                                        <RadioGroups.IconSimple aria-label="Pricing plans" defaultValue={plans[0]?.value ?? ""} items={plans} />
                                    </div>
                                    <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                                        <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                            Confirm
                                        </Button>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };
        return <Plan01Component />;
    },
};
// Plan 02
export const Plan02: Story = {
    render: () => {
        const Plan02Component = () => {
            const [isOpen, setIsOpen] = useModalState();

            const plans = [
                {
                    value: "basic",
                    title: "$10/mth",
                    secondaryTitle: "Basic plan",
                    description: "Up to 10 users and 20 GB individual data.",
                    icon: LayersTwo01,
                    features: ["Basic features", "Basic reporting", "Up to 10 individual users", "20 GB data per user"],
                },

                {
                    value: "business",
                    title: "$20/mth",
                    secondaryTitle: "Business plan",
                    description: "Up to 20 users and 40 GB individual data.",
                    icon: LayersThree01,
                    features: ["Advanced features", "Advanced reporting", "Up to 20 individual users", "40 GB data per user"],
                },
            ];

            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-160">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3 z-20" />
                                    <div className="flex items-start gap-4 px-4 pt-5 max-sm:flex-col sm:px-6 sm:pt-6">
                                        <div className="relative">
                                            <FeaturedIcon color="gray" size="lg" theme="modern" icon={LayersTwo01} />
                                            <BackgroundPattern
                                                pattern="circle"
                                                size="sm"
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:hidden"
                                            />
                                        </div>

                                        <div className="z-10 flex flex-col gap-0.5">
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Select plan
                                            </AriaHeading>
                                            <p className="text-sm text-tertiary">Simple and flexible per-user pricing.</p>
                                        </div>
                                    </div>
                                    <div className="h-5 w-full" />
                                    <div className="w-full border-t border-secondary" />

                                    <AriaRadioGroup
                                        defaultValue={plans[0]?.value}
                                        aria-label="Pricing plans"
                                        className="grid size-full grid-cols-1 gap-3 px-4 pt-5 sm:grid-cols-2 sm:gap-5 sm:px-6"
                                    >
                                        {plans.map((plan) => (
                                            <AriaRadio
                                                key={plan.value}
                                                value={plan.value}
                                                className={({ isSelected }) =>
                                                    cx(
                                                        "relative flex cursor-pointer flex-col items-start rounded-xl bg-primary shadow-xs ring-1 ring-secondary ring-inset",
                                                        isSelected && "ring-2 ring-brand",
                                                    )
                                                }
                                            >
                                                {(state) => (
                                                    <>
                                                        <div className="flex w-full flex-col gap-1 p-4 sm:gap-2 sm:px-5 sm:pt-5 sm:pb-0">
                                                            <h3 className="text-display-xs font-semibold text-primary">{plan.title}</h3>
                                                            <div className="flex items-center gap-0.5 sm:flex-col sm:items-start">
                                                                <p className="w-full text-md font-semibold text-primary">{plan.secondaryTitle}</p>
                                                                <p className="text-sm whitespace-nowrap text-tertiary">Billed annually</p>
                                                            </div>
                                                        </div>

                                                        <CheckboxBase {...state} size="md" className="absolute top-4 right-4 z-10" />

                                                        <ul className="flex flex-col gap-3 p-5 max-sm:hidden">
                                                            {plan.features.map((feature) => (
                                                                <CheckItemText key={feature} color="primary" iconStyle="outlined" text={feature} size="sm" />
                                                            ))}
                                                        </ul>
                                                    </>
                                                )}
                                            </AriaRadio>
                                        ))}
                                    </AriaRadioGroup>
                                    <div id="divider-wrap" className="h-8 w-full max-sm:hidden" />
                                    <div className="w-full border-t border-secondary max-sm:hidden" />
                                    <div className="z-10 flex w-full flex-1 flex-col-reverse gap-3 p-4 pt-6 sm:flex-row sm:px-6 sm:pb-6">
                                        <Button size="md" color="secondary" className="max-sm:hidden" iconLeading={MessageChatCircle}>
                                            Chat to us
                                        </Button>
                                        <div className="flex w-full flex-col-reverse justify-end gap-3 sm:flex-row">
                                            <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                                Cancel
                                            </Button>
                                            <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                                Select plan
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };
        return <Plan02Component />;
    },
};

const paymentCards = [
    {
        value: "card-1",
        title: "Visa ending in 1234",
        description: "Expiry 06/2025",
        logo: <VisaIcon className="h-8 w-11.5" />,
    },
    {
        value: "card-2",
        title: "Mastercard ending in 1234",
        description: "Expiry 06/2025",
        logo: <MastercardIcon className="h-8 w-11.5" />,
    },
    {
        value: "card-3",
        title: "Visa ending in 1234",
        description: "Expiry 06/2025",
        logo: <VisaIcon className="h-8 w-11.5" />,
    },
];
// Payment Method
export const PaymentMethod: Story = {
    render: () => {
        const PaymentMethodComponent = () => {
            const [isOpen, setIsOpen] = useModalState();
            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-120">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3" />
                                    <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <div className="relative w-max">
                                            <FeaturedIcon color="gray" size="lg" theme="modern" icon={CurrencyDollarCircle} />

                                            <BackgroundPattern
                                                pattern="circle"
                                                size="sm"
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                            />
                                        </div>
                                        <div className="z-10 flex flex-col gap-0.5">
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Change your payment method
                                            </AriaHeading>
                                            <p className="text-sm text-tertiary">Update your plan payment details.</p>
                                        </div>
                                    </div>
                                    <div className="h-5 w-full" />
                                    <div className="px-4 sm:px-6">
                                        <RadioGroups.PaymentIcon aria-label="Payment methods" defaultValue={paymentCards[0]?.value} items={paymentCards} />
                                    </div>
                                    <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                                        <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                            Confirm
                                        </Button>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };
        return <PaymentMethodComponent />;
    },
};

// Date Picker
export const DatePicker: Story = {
    render: () => {
        const DatePickerComponent = () => {
            const now = today(getLocalTimeZone());
            const defaultRange = {
                start: now.subtract({ days: 7 }),
                end: now,
            };

            const { locale } = useLocale();
            const isDesktop = useBreakpoint("md");
            const [isOpen, setIsOpen] = useModalState();
            const [value, setValue] = useControlledState<{
                start: DateValue;
                end: DateValue;
            } | null>(undefined, defaultRange, undefined);
            const [focusedValue, setFocusedValue] = useState<DateValue | null>(null);

            const highlightedDates = [today(getLocalTimeZone())];

            const presets = useMemo(
                () => ({
                    today: { label: "Today", value: { start: now, end: now } },
                    yesterday: {
                        label: "Yesterday",
                        value: {
                            start: now.subtract({ days: 1 }),
                            end: now.subtract({ days: 1 }),
                        },
                    },
                    thisWeek: {
                        label: "This week",
                        value: {
                            start: startOfWeek(now, locale),
                            end: endOfWeek(now, locale),
                        },
                    },
                    lastWeek: {
                        label: "Last week",
                        value: {
                            start: startOfWeek(now, locale).subtract({ weeks: 1 }),
                            end: endOfWeek(now, locale).subtract({ weeks: 1 }),
                        },
                    },
                    thisMonth: {
                        label: "This month",
                        value: { start: startOfMonth(now), end: endOfMonth(now) },
                    },
                    lastMonth: {
                        label: "Last month",
                        value: {
                            start: startOfMonth(now).subtract({ months: 1 }),
                            end: endOfMonth(now).subtract({ months: 1 }),
                        },
                    },
                    thisYear: {
                        label: "This year",
                        value: {
                            start: startOfMonth(now.set({ month: 1 })),
                            end: endOfMonth(now.set({ month: 12 })),
                        },
                    },
                    lastYear: {
                        label: "Last year",
                        value: {
                            start: startOfMonth(now.set({ month: 1 }).subtract({ years: 1 })),
                            end: endOfMonth(now.set({ month: 12 }).subtract({ years: 1 })),
                        },
                    },
                    allTime: {
                        label: "All time",
                        value: {
                            start: now.set({ year: 2000, month: 1, day: 1 }),
                            end: now,
                        },
                    },
                }),
                [locale, now],
            );

            return (
                <AriaDateRangePicker
                    aria-label="Date range picker"
                    isOpen={isOpen}
                    onOpenChange={setIsOpen}
                    shouldCloseOnSelect={false}
                    value={value}
                    onChange={setValue}
                >
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="flex rounded-2xl bg-primary shadow-xl ring-1 ring-secondary_alt">
                                    {isDesktop && (
                                        <div className="flex w-38 flex-col gap-0.5 border-r border-solid border-secondary p-3 max-md:hidden">
                                            {Object.values(presets).map((preset) => (
                                                <RangePresetButton
                                                    key={preset.label}
                                                    value={preset.value}
                                                    onClick={() => {
                                                        setValue(preset.value);
                                                        setFocusedValue(preset.value.start);
                                                    }}
                                                >
                                                    {preset.label}
                                                </RangePresetButton>
                                            ))}
                                        </div>
                                    )}
                                    <div className="flex flex-col">
                                        <RangeCalendar
                                            focusedValue={focusedValue}
                                            onFocusChange={setFocusedValue}
                                            highlightedDates={highlightedDates}
                                            presets={{
                                                lastWeek: presets.lastWeek,
                                                lastMonth: presets.lastMonth,
                                                lastYear: presets.lastYear,
                                            }}
                                        />
                                        <div className="flex justify-between gap-3 border-t border-secondary p-4">
                                            {isDesktop && (
                                                <div className="hidden items-center gap-3 md:flex">
                                                    <DateInput slot="start" className="w-36" />
                                                    <div className="text-md text-quaternary">–</div>
                                                    <DateInput slot="end" className="w-36" />
                                                </div>
                                            )}
                                            <div className="grid w-full grid-cols-2 gap-3 md:flex md:w-auto">
                                                <Button size="md" color="secondary" onClick={() => setIsOpen(false)}>
                                                    Cancel
                                                </Button>
                                                <Button size="md" color="primary" onClick={() => setIsOpen(false)}>
                                                    Apply
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDateRangePicker>
            );
        };
        return <DatePickerComponent />;
    },
};

type UploadedFile = {
    name: string;
    size: number;
    progress: number;
    type?: string;
    failed?: boolean;
};
// File Upload
export const FileUpload: Story = {
    render: () => {
        const FileUploadStoryComponent = () => {
            const [isOpen, setIsOpen] = useModalState();
            const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
                {
                    name: "Tech design requirements.pdf",
                    type: "pdf",
                    progress: 100,
                    failed: false,
                    size: 210000,
                },
            ]);

            const uploadFile = (file: File, onProgress: (progress: number) => void) => {
                // Replace this with your own upload logic
                let progress = 0;

                const interval = setInterval(() => {
                    onProgress(++progress);
                    if (progress === 100) {
                        clearInterval(interval);
                    }
                }, 100);
            };

            const handleDropFiles = (files: FileList) => {
                const newFiles = Array.from(files);

                setUploadedFiles(
                    newFiles
                        .map(
                            (file) =>
                                ({
                                    name: file.name,
                                    size: file.size,
                                    type: file.type,
                                    progress: 0,
                                }) as UploadedFile,
                        )
                        .concat(uploadedFiles),
                );

                newFiles.forEach((file) => {
                    uploadFile(file, (progress) => {
                        setUploadedFiles((prev) =>
                            prev.map((uploadedFile) => (uploadedFile.name === file.name ? { ...uploadedFile, progress } : uploadedFile)),
                        );
                    });
                });
            };
            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-120">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3" />
                                    <div className="flex flex-col gap-0.5 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                            Upload and attach files
                                        </AriaHeading>
                                        <p className="text-sm text-tertiary">Upload and attach files to this project.</p>
                                    </div>

                                    <div className="h-5 w-full" />
                                    <FileUploadComponent.Root className="flex flex-col gap-4 px-4 sm:px-6">
                                        <FileUploadComponent.DropZone onDropFiles={handleDropFiles} />
                                        <FileUploadComponent.List className="flex flex-col gap-3">
                                            {uploadedFiles.map((file) => (
                                                <FileUploadComponent.ListItemProgressBar
                                                    key={file.name}
                                                    name={file.name}
                                                    size={file.size}
                                                    progress={file.progress}
                                                    type={file.type}
                                                    failed={file.failed}
                                                />
                                            ))}
                                        </FileUploadComponent.List>
                                    </FileUploadComponent.Root>

                                    <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 sm:grid sm:grid-cols-2 sm:justify-end sm:px-6 sm:pt-8 sm:pb-6">
                                        <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                            Attach files
                                        </Button>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };
        return <FileUploadStoryComponent />;
    },
};

// Profile Settings
export const ProfileSettings: Story = {
    render: () => {
        const ProfileSettingsComponent = () => {
            const [isOpen, setIsOpen] = useModalState();
            const { copy, copied } = useClipboard();
            const [uploadedAvatar, setUploadedAvatar] = useState<string | undefined>("https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80");

            const handleAvatarUpload = (file: File) => {
                console.log("File uploaded:", file);
                setUploadedAvatar(URL.createObjectURL(file));
            };
            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-120">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3" />
                                    <div className="flex flex-col gap-0.5 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                            Complete your profile
                                        </AriaHeading>
                                        <p className="text-sm text-tertiary">Choose a username and write a brief intro.</p>
                                    </div>

                                    <div className="h-5 w-full" />
                                    <Form
                                        id="profile-settings-form-modal"
                                        className="flex flex-col gap-4 px-4 sm:px-6"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            const data = Object.fromEntries(new FormData(e.currentTarget));
                                            console.log("Form data:", data);
                                            setIsOpen(false);
                                        }}
                                    >
                                        <div className="flex w-full items-center gap-5 md:items-start">
                                            <Avatar verified size="2xl" src={uploadedAvatar} />
                                            <Button color="secondary" size="md" iconLeading={UploadCloud02} className="md:hidden">
                                                Upload photo
                                            </Button>
                                            <FileUploadDropZone
                                                className="w-full max-md:hidden"
                                                onDropFiles={(files) => {
                                                    const file = files[0];
                                                    if (file) handleAvatarUpload(file);
                                                }}
                                            />
                                        </div>
                                        <InputGroup
                                            isRequired
                                            label="Username"
                                            name="username"
                                            size="sm"
                                            defaultValue="@oliviarhye"
                                            leadingAddon={<InputGroup.Prefix>untitledui.com/</InputGroup.Prefix>}
                                        >
                                            <InputBase />
                                        </InputGroup>
                                        <TextArea
                                            isRequired
                                            label="Introduction"
                                            name="intro"
                                            placeholder="Write a brief introduction to show on your profile..."
                                            textAreaClassName="min-h-31.5 md:min-h-45"
                                        />
                                        <span className="flex items-center gap-2">
                                            <Checkbox
                                                name="consent"
                                                label={
                                                    <>
                                                        I agree with the&nbsp;
                                                        <a
                                                            href="#"
                                                            className="rounded-xs underline underline-offset-3 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                                                        >
                                                            terms and conditions
                                                        </a>
                                                    </>
                                                }
                                            />
                                        </span>
                                    </Form>

                                    <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 sm:flex sm:flex-row sm:items-center sm:justify-end sm:px-6 sm:pt-8 sm:pb-6">
                                        <Button
                                            size="md"
                                            color="link-gray"
                                            onClick={() => copy("https://www.untitledui.com/")}
                                            iconLeading={copied ? Check : Copy01}
                                            className="mr-auto max-md:hidden"
                                        >
                                            {copied ? "Copied" : "Copy link"}
                                        </Button>
                                        <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" id="profile-settings-form-modal" color="primary" size="md">
                                            Publish profile
                                        </Button>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };
        return <ProfileSettingsComponent />;
    },
};

// User Selection
export const UserSelection: Story = {
    render: () => {
        const UserSelectionComponent = () => {
            const [isOpen, setIsOpen] = useModalState();
            const [count, setCount] = useState(32);

            const handleIncrement = () => {
                setCount((prevCount) => Math.min(prevCount + 1, 100));
            };

            const handleDecrement = () => {
                setCount((prevCount) => Math.max(prevCount - 1, 1));
            };

            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-120">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3 z-10" />
                                    <div className="flex gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <FeaturedIcon color="gray" size="lg" theme="modern" icon={UsersCheck} className="max-sm:hidden" />

                                        <div className="z-10 flex flex-col gap-0.5">
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Purchase seats
                                            </AriaHeading>
                                            <p className="text-sm text-tertiary">Select how many seats you need.</p>
                                        </div>
                                    </div>
                                    <div className="h-5 w-full" />
                                    <div className="w-full border-t border-secondary" />
                                    <div className="flex flex-col gap-3 px-4 pt-5 sm:px-6">
                                        <div className="flex items-center justify-center gap-6">
                                            <Button
                                                aria-label="Decrease"
                                                size="lg"
                                                color="secondary"
                                                iconLeading={Minus}
                                                className="max-sm:hidden"
                                                onClick={handleDecrement}
                                            />
                                            <Button
                                                aria-label="Decrease"
                                                size="sm"
                                                color="secondary"
                                                iconLeading={Minus}
                                                className="sm:hidden"
                                                onClick={handleDecrement}
                                            />

                                            <h1 className="text-display-lg font-semibold text-primary tabular-nums sm:text-display-2xl">{count}</h1>

                                            <Button
                                                aria-label="Increase"
                                                size="lg"
                                                color="secondary"
                                                iconLeading={Plus}
                                                className="max-sm:hidden"
                                                onClick={handleIncrement}
                                            />
                                            <Button
                                                aria-label="Increase"
                                                size="sm"
                                                color="secondary"
                                                iconLeading={Plus}
                                                className="sm:hidden"
                                                onClick={handleIncrement}
                                            />
                                        </div>
                                        <div className="w-full border-t border-secondary" />
                                        <div className="flex flex-col gap-3">
                                            <span className="flex justify-between">
                                                <p className="text-md font-semibold text-primary">Price per seat</p>
                                                <p className="text-md text-tertiary">$10</p>
                                            </span>
                                            <span className="flex justify-between">
                                                <p className="text-md font-semibold text-primary">Total</p>
                                                <p className="text-md text-tertiary">${count * 10}</p>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="z-10 flex flex-col pt-6 pb-4 sm:pt-8 sm:pb-6">
                                        <div className="w-full border-t border-secondary" />

                                        <div className="h-4 w-full sm:h-6" />
                                        <div className="flex flex-1 flex-col-reverse gap-3 px-4 sm:grid sm:grid-cols-2 sm:px-6">
                                            <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                                Cancel
                                            </Button>
                                            <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                                Purchase seats
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };
        return <UserSelectionComponent />;
    },
};

// Form 01
export const Form01: Story = {
    render: () => {
        const Form01Component = () => {
            const people = [
                { id: "@phoenix", label: "Phoenix Baker" },
                { id: "@olivia", label: "Olivia Ryhe" },
                { id: "@lana", label: "Lana Steiner", disabled: true },
                { id: "@demi", label: "Demi Wilkinson" },
                { id: "@candice", label: "Candice Wu" },
                { id: "@natali", label: "Natali Craig" },
                { id: "@carolineschultz", label: "Caroline Schultz" },
                { id: "@drew", label: "Drew Cano" },
                { id: "@evelyn", label: "Evelyn Harrison" },
                { id: "@kari", label: "Kari Rasmussen" },
            ];

            const employmentTypes = [
                { label: "Full time", id: "fulltime" },
                { label: "Part time", id: "parttime" },
            ];

            const [isOpen, setIsOpen] = useModalState();

            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog className="overflow-hidden">
                                <Carousel.Root className="relative w-full overflow-hidden! rounded-xl bg-primary shadow-xl sm:max-w-160">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3" />
                                    <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <div className="relative w-max max-sm:hidden">
                                            <FeaturedIcon color="gray" size="lg" theme="modern" icon={Flag05} />

                                            <BackgroundPattern
                                                pattern="circle"
                                                size="sm"
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                            />
                                        </div>
                                        <div className="z-10 flex flex-col gap-0.5">
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Add experience
                                            </AriaHeading>
                                            <p className="text-sm text-tertiary">Share where you&apos;ve worked on your profile.</p>
                                        </div>
                                    </div>
                                    <div className="h-5 w-full" />
                                    <Carousel.Content className="gap-5">
                                        <Carousel.Item className="grid w-full grid-cols-1 items-start justify-start gap-4 px-4 sm:grid-cols-[280px_1fr] sm:px-6">
                                            <Input size="sm" label="Title" placeholder="What is your title?" className="sm:col-span-2" />
                                            <Select.ComboBox
                                                label="Company"
                                                className="sm:col-span-1"
                                                size="sm"
                                                items={people}
                                                shortcut={false}
                                                placeholder="Search for company"
                                            >
                                                {(item) => (
                                                    <Select.Item key={item.id} id={item.id}>
                                                        {item.label}
                                                    </Select.Item>
                                                )}
                                            </Select.ComboBox>
                                            <InputGroup
                                                size="sm"
                                                label="Website"
                                                className="sm:col-span-1"
                                                leadingAddon={<InputGroup.Prefix>https://</InputGroup.Prefix>}
                                            >
                                                <InputBase placeholder="www.example.com" />
                                            </InputGroup>{" "}
                                            <Select.ComboBox
                                                size="sm"
                                                label="Location"
                                                className="sm:col-span-1"
                                                placeholder="Search for city"
                                                items={people}
                                                shortcutClassName="sm:hidden"
                                            >
                                                {(item) => (
                                                    <Select.Item key={item.id} id={item.id}>
                                                        {item.label}
                                                    </Select.Item>
                                                )}
                                            </Select.ComboBox>
                                            <div className="w-32 max-sm:hidden">
                                                <Select
                                                    label="Employment"
                                                    size="sm"
                                                    items={employmentTypes}
                                                    defaultSelectedKey={employmentTypes[0]?.id ?? ""}
                                                    popoverClassName="w-max"
                                                >
                                                    {(item) => (
                                                        <Select.Item key={item.id} id={item.id}>
                                                            {item.label}
                                                        </Select.Item>
                                                    )}
                                                </Select>
                                            </div>
                                            <Input size="sm" label="Title" placeholder="What is your title?" className="col-span-2 max-sm:hidden" />
                                            <div className="col-span-2 flex h-36 flex-col gap-1.5 self-stretch max-sm:hidden">
                                                <Label className="flex items-center gap-0.5" tooltip="This will be public">
                                                    Description
                                                </Label>
                                                <TextAreaBase
                                                    className="flex-1 rounded-lg px-3.5 py-3"
                                                    placeholder="e.g. I joined Stripe's Customer Success team to help them scale their checkout product. I focused mainly on onboarding new customers and resolving complaints."
                                                />
                                            </div>
                                        </Carousel.Item>
                                        <Carousel.Item className="flex w-full flex-col gap-4 px-4 sm:hidden sm:px-6">
                                            <Select defaultSelectedKey={employmentTypes[0]?.id ?? ""} label="Employment" size="sm" items={employmentTypes}>
                                                {(item) => (
                                                    <Select.Item key={item.id} id={item.id}>
                                                        {item.label}
                                                    </Select.Item>
                                                )}
                                            </Select>
                                            <Input size="sm" label="Title" placeholder="What is your title?" className="max-sm:hidden" />
                                            <div className="resize-both flex min-h-40 flex-col gap-1.5 self-stretch">
                                                <Label className="flex items-center gap-0.5" tooltip="This will be public">
                                                    Description
                                                </Label>
                                                <TextAreaBase
                                                    className="h-full flex-1 rounded-lg px-3.5 py-3"
                                                    placeholder="e.g. I joined Stripe's Customer Success team to help them scale their checkout product. I focused mainly on onboarding new customers and resolving complaints."
                                                />
                                            </div>
                                        </Carousel.Item>
                                    </Carousel.Content>

                                    <div className="mt-5 sm:hidden">
                                        <Carousel.IndicatorGroup className="mx-auto flex gap-2">
                                            {({ index }) => (
                                                <Carousel.Indicator
                                                    index={index}
                                                    className={({ isSelected }) =>
                                                        cx("size-2 rounded-full transition-colors", isSelected ? "bg-brand-solid" : "bg-quaternary")
                                                    }
                                                />
                                            )}
                                        </Carousel.IndicatorGroup>
                                    </div>

                                    <CarouselContext.Consumer>
                                        {(context) => (
                                            <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                                                <Button
                                                    size="md"
                                                    color="secondary"
                                                    iconLeading={context?.canScrollPrev ? ArrowLeft : Save01}
                                                    onClick={() => (context?.canScrollPrev ? context?.scrollPrev() : setIsOpen(false))}
                                                >
                                                    {context?.canScrollPrev ? "Back" : "Save as draft"}
                                                </Button>
                                                <Button
                                                    size="md"
                                                    color="primary"
                                                    onClick={() => (context?.canScrollNext ? context?.scrollNext() : setIsOpen(false))}
                                                >
                                                    {context?.canScrollNext ? "Next" : "Add experience"}
                                                </Button>
                                            </div>
                                        )}
                                    </CarouselContext.Consumer>
                                </Carousel.Root>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };
        return <Form01Component />;
    },
};

// Form 02
export const Form02: Story = {
    render: () => {
        const Form02Component = () => {
            const [isOpen, setIsOpen] = useModalState();
            const [uploadedAvatar, setUploadedAvatar] = useState<string | undefined>();

            const handleAvatarUpload = (file: File) => {
                console.log("File uploaded:", file);
                setUploadedAvatar(URL.createObjectURL(file));
            };

            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-172">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3" />
                                    <div className="flex gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <FeaturedIcon color="gray" size="lg" theme="modern" icon={Building05} className="max-sm:hidden" />

                                        <div className="z-10 flex flex-col gap-0.5">
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Add your company
                                            </AriaHeading>
                                            <p className="text-sm text-tertiary">
                                                Create your company profile for free <span className="max-md:hidden">in less than 5 minutes.</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="h-5 w-full" />
                                    <div className="w-full border-t border-secondary" />
                                    <div className="flex flex-col justify-start gap-4 px-4 pt-5 sm:px-6">
                                        <section className="flex items-start gap-8">
                                            <Label className="w-40 max-sm:hidden">Company name</Label>

                                            <TextField name="company" className="flex-1">
                                                <Label className="sm:hidden">Company name</Label>
                                                <InputBase size="sm" placeholder="e.g. Linear" />
                                            </TextField>
                                        </section>
                                        <section className="flex items-start gap-8">
                                            <Label className="w-40 max-sm:hidden">Website URL</Label>
                                            <TextField name="website" className="flex-1">
                                                <Label className="sm:hidden">Website URL</Label>
                                                <InputBase size="sm" placeholder="www.example.com" />
                                            </TextField>
                                        </section>
                                        <div className="w-full border-t border-secondary max-sm:hidden" />
                                        <section className="flex items-start gap-8">
                                            <Label className="w-40 max-sm:hidden">Profile image</Label>
                                            <section className="flex w-full flex-1 items-center gap-5 sm:items-start">
                                                <AvatarProfilePhoto size="sm" placeholderIcon={ImagePlus} src={uploadedAvatar} />
                                                <span className="w-full max-sm:hidden">
                                                    <FileUploadDropZone
                                                        className="**:data-featured-icon:hidden"
                                                        onDropFiles={(files) => {
                                                            const file = files[0];
                                                            if (file) handleAvatarUpload(file);
                                                        }}
                                                    />
                                                </span>
                                                <Button size="md" color="secondary" iconLeading={UploadCloud02} className="sm:hidden">
                                                    Upload photo
                                                </Button>
                                            </section>
                                        </section>
                                        <div className="w-full border-t border-secondary max-sm:hidden" />
                                        <section className="flex items-start gap-8">
                                            <Label className="w-40 max-sm:hidden">Username</Label>

                                            <section className="flex flex-1">
                                                <InputGroup
                                                    isRequired
                                                    className="sm:[&_[data-label]]:hidden"
                                                    label="Username"
                                                    name="username"
                                                    size="sm"
                                                    defaultValue="untitled"
                                                    leadingAddon={<InputGroup.Prefix>untitledui.com/</InputGroup.Prefix>}
                                                >
                                                    <InputBase placeholder="example" />
                                                </InputGroup>
                                            </section>
                                        </section>
                                        <section className="flex flex-1 items-start gap-8 max-sm:hidden">
                                            <Label className="w-40 max-sm:hidden">Keywords</Label>
                                            <section className="flex flex-1">
                                                <TextArea
                                                    aria-label="Keywords"
                                                    className="h-20"
                                                    placeholder="Add 1-10 keywords that help users find your company. For example, B2B, SaaS, marketplace, design..."
                                                />
                                            </section>
                                        </section>
                                        <section className="flex items-start gap-8 max-sm:hidden">
                                            <Label className="w-40 max-sm:hidden">Description</Label>
                                            <section className="flex flex-1">
                                                <TextArea aria-label="Description" className="h-20" placeholder="Write a few sentences about the company..." />
                                            </section>
                                        </section>
                                    </div>
                                    <div className="z-10 flex flex-col pt-6 pb-4 sm:pt-8 sm:pb-6">
                                        <div className="w-full border-t border-secondary" />

                                        <div className="h-4 w-full sm:h-6" />
                                        <div className="flex flex-1 flex-col-reverse gap-3 px-4 sm:grid sm:grid-cols-2 sm:px-6">
                                            <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                                Cancel
                                            </Button>
                                            <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                                Add company
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };
        return <Form02Component />;
    },
};

// Image Crop
export const ImageCrop: Story = {
    render: () => {
        const ImageCropComponent = () => {
            const images = [
                {
                    src: "https://www.untitledui.com/application/image-cropper/option1.webp",
                    alt: "Option 1",
                },
                {
                    src: "https://www.untitledui.com/application/image-cropper/option2.webp",
                    alt: "Option 2",
                },
                {
                    src: "https://www.untitledui.com/application/image-cropper/option3.webp",
                    alt: "Option 3",
                },
                {
                    src: "https://www.untitledui.com/application/image-cropper/option4.webp",
                    alt: "Option 4",
                },
                {
                    src: "https://www.untitledui.com/application/image-cropper/option5.webp",
                    alt: "Option 5",
                },
                {
                    src: "https://www.untitledui.com/application/image-cropper/option6.webp",
                    alt: "Option 6",
                },
                {
                    src: "https://www.untitledui.com/application/image-cropper/option7.webp",
                    alt: "Option 7",
                },
                {
                    src: "https://www.untitledui.com/application/image-cropper/option8.webp",
                    alt: "Option 8",
                },
                {
                    src: "https://www.untitledui.com/application/image-cropper/option9.webp",
                    alt: "Option 9",
                },
                {
                    src: "https://www.untitledui.com/application/image-cropper/option10.webp",
                    alt: "Option 10",
                },
            ];

            const [crop, setCrop] = useState<Crop>();
            const [isOpen, setIsOpen] = useModalState();
            const [imageSrc, setImageSrc] = useState(images[0]);
            const [imageSet, setImageSet] = useState(images);

            const aspect = 10 / 3;

            const handleClick = (image: { src: string; alt: string }) => {
                setImageSrc(image);
            };

            const handleChange = async (files: FileList | null) => {
                const file = files?.[0];

                if (!file) {
                    return;
                }

                const link = URL.createObjectURL(file);

                setImageSrc?.({
                    src: link,
                    alt: file.name,
                });
                setImageSet((prev) => [...prev, { src: link, alt: file.name }]);
            };

            const handleImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
                const { naturalWidth: width, naturalHeight: height } = e.currentTarget;

                const crop = centerCrop(
                    makeAspectCrop(
                        {
                            unit: "%",
                            width: 100,
                        },
                        aspect,
                        width,
                        height,
                    ),
                    width,
                    height,
                );

                setCrop(crop);
            };

            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-140">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3" />
                                    <div className="flex gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <FeaturedIcon color="gray" size="lg" theme="modern" icon={Crop01} className="max-sm:hidden" />

                                        <div className="z-10 flex flex-col gap-0.5">
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Crop header image
                                            </AriaHeading>
                                            <p className="text-sm text-tertiary">Upload a 1600 x 480px image for best results.</p>
                                        </div>
                                    </div>
                                    <div className="h-5 w-full" />
                                    <div className="flex flex-col gap-4 px-4 sm:px-6 md:gap-5">
                                        <Cropper
                                            aspect={aspect}
                                            crop={crop}
                                            onChange={(crop, percentCrop) => setCrop(percentCrop)}
                                            className="h-50 w-full self-stretch sm:h-78"
                                        >
                                            <Cropper.Img {...imageSrc} onLoad={handleImageLoad} />
                                        </Cropper>

                                        <div className="flex flex-wrap items-center justify-start gap-y-2">
                                            {imageSet.map((image) => (
                                                <button
                                                    aria-label={`Select image ${image.alt}`}
                                                    key={image.alt}
                                                    onClick={() => handleClick(image)}
                                                    className={cx(
                                                        "flex size-10 cursor-pointer items-center justify-center rounded-full p-1.5 outline-hidden transition-all duration-150 ease-linear ring-inset last:mr-2 focus:ring-3 focus:ring-brand",
                                                        image.src === imageSrc?.src && "ring-3 ring-brand",
                                                    )}
                                                >
                                                    <img {...image} className="size-full rounded-full object-cover object-center" alt={image.alt} />
                                                </button>
                                            ))}
                                            <FileTrigger acceptedFileTypes={["image/*"]} onSelect={handleChange}>
                                                <Button color="secondary" iconLeading={Plus} />
                                            </FileTrigger>
                                        </div>
                                    </div>

                                    <div className="z-10 flex flex-col pt-6 pb-4 sm:pt-8 sm:pb-6">
                                        <div className="w-full border-t border-secondary max-md:hidden" />
                                        <div className="h-4 w-full max-md:hidden sm:h-6" />
                                        <div className="flex flex-1 flex-col-reverse gap-3 px-4 sm:flex-row sm:justify-end sm:px-6">
                                            <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                                Cancel
                                            </Button>
                                            <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                                Save changes
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };
        return <ImageCropComponent />;
    },
};

// Calendar Event
export const CalendarEvent: Story = {
    render: () => {
        const CalendarEventComponent = () => {
            const [isOpen, setIsOpen] = useModalState();
            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100">
                                    <div className="flex justify-center px-4 pt-5 sm:px-6 sm:pt-6">
                                        <div className="flex h-max w-16 flex-col overflow-hidden rounded-lg border border-secondary">
                                            <span className="z-0 bg-secondary px-[7px] pt-[3px] pb-0.5 text-center">
                                                <p className="text-xs font-semibold text-quaternary">JAN</p>
                                            </span>
                                            <span className="px-[7px] pt-px pb-[2px] text-center">
                                                <p className="text-lg font-bold! text-brand-secondary">10</p>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-0.5 px-4 pt-5 sm:px-6 sm:pt-4">
                                        <AriaHeading slot="title" className="text-center text-md font-semibold text-primary">
                                            Invitation: Product demo
                                        </AriaHeading>
                                        <p className="text-center text-sm text-tertiary">Sienna Hewitt @ Friday, Jan 10, 2025</p>
                                    </div>
                                    <div className="h-5 w-full" />
                                    <div className="flex flex-col items-start justify-start gap-4 px-4 sm:px-6 md:gap-5">
                                        <div className="flex flex-col gap-3">
                                            <p className="text-sm font-semibold text-primary">Details</p>
                                            <section className="flex flex-col gap-2">
                                                <span className="flex gap-2">
                                                    <Calendar size={20} className="text-fg-quaternary" />
                                                    <p className="text-sm text-tertiary">Friday, Jan 10, 2025</p>
                                                </span>
                                                <span className="flex gap-2">
                                                    <Clock size={20} className="text-fg-quaternary" />
                                                    <p className="text-sm text-tertiary">1:30 PM - 3:30 PM</p>
                                                </span>
                                                <span className="flex gap-2">
                                                    <BellRinging01 size={20} className="text-fg-quaternary" />
                                                    <p className="text-sm text-tertiary">10 min before</p>
                                                </span>
                                            </section>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <p className="text-sm font-semibold text-primary">Organizer</p>
                                            <AvatarLabelGroup
                                                size="md"
                                                src="https://www.untitledui.com/images/avatars/sienna-hewitt?fm=webp&q=80"
                                                title="Sienna Hewitt"
                                                subtitle="sienna@untitledui.com"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <p className="text-sm font-semibold text-primary">Attendees</p>
                                            <div className="flex gap-2">
                                                <div className="flex flex-row -space-x-3">
                                                    <Avatar
                                                        className="ring-[1.5px] ring-bg-primary"
                                                        src="https://www.untitledui.com/images/avatars/sienna-hewitt?fm=webp&q=80"
                                                        alt="Sienna Hewitt"
                                                    />
                                                    <Avatar
                                                        className="ring-[1.5px] ring-bg-primary"
                                                        src="https://www.untitledui.com/images/avatars/ammar-foley?fm=webp&q=80"
                                                        alt="Ammar Foley"
                                                    />
                                                    <Avatar
                                                        className="ring-[1.5px] ring-bg-primary"
                                                        src="https://www.untitledui.com/images/avatars/pippa-wilkinson?fm=webp&q=80"
                                                        alt="Pippa Wilkinson"
                                                    />
                                                    <Avatar
                                                        className="ring-[1.5px] ring-bg-primary"
                                                        src="https://www.untitledui.com/images/avatars/olly-schroeder?fm=webp&q=80"
                                                        alt="Olly Schroeder"
                                                    />
                                                    <Avatar
                                                        className="ring-[1.5px] ring-bg-primary"
                                                        src="https://www.untitledui.com/images/avatars/mathilde-lewis?fm=webp&q=80"
                                                        alt="Mathilde Lewis"
                                                    />
                                                    <Avatar className="ring-[1.5px] ring-bg-primary" initials="OR" />
                                                </div>
                                                <AvatarAddButton size="md" />
                                            </div>

                                            <section className="flex items-center gap-2">
                                                <p className="text-sm font-semibold text-primary">6 guests</p>
                                                <span className="h-[13px] border-l border-primary" />
                                                <p className="text-sm text-tertiary">5 yes</p>
                                                <span className="h-[13px] border-l border-primary" />
                                                <p className="text-sm text-tertiary">1 awaiting</p>
                                            </section>
                                        </div>
                                    </div>
                                    <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 sm:flex-row sm:items-center sm:justify-end sm:px-6 sm:pt-8 sm:pb-6">
                                        <Button color="link-gray" size="md" className="mr-auto max-sm:hidden">
                                            Maybe
                                        </Button>
                                        <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                            Decline
                                        </Button>
                                        <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                            Accept
                                        </Button>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };
        return <CalendarEventComponent />;
    },
};

// Banner Appearance
export const BannerAppearance: Story = {
    render: () => {
        const BannerAppearanceComponent = () => {
            const banners = [
                {
                    value: "default",
                    label: "Default",
                    description: "Default solid brand color.",
                    component: DefaultBanner,
                    componentSM: DefaultBannerSM,
                },
                {
                    value: "simplified",
                    label: "Simplified",
                    description: "Minimal and simplified.",
                    component: SimplifiedBanner,
                    componentSM: NoneBannerSM,
                },
                {
                    value: "none",
                    label: "None",
                    description: "Hide all banners.",
                    component: NoneBanner,
                    componentSM: NoneBannerSM,
                },
                {
                    value: "custom",
                    label: "Custom styling",
                    description: "Manage styling with CSS.",
                    component: NoneBanner,
                    componentSM: NoneBannerSM,
                },
            ];

            const [isOpen, setIsOpen] = useModalState();
            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-137">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3" />
                                    <div className="flex flex-col gap-0.5 px-4 pt-5 sm:px-6 sm:pt-6">
                                        <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                            Banner appearance
                                        </AriaHeading>
                                        <p className="text-sm text-tertiary">Change how banners appear to visitors.</p>
                                    </div>
                                    <div className="h-5 w-full" />
                                    <AriaRadioGroup
                                        aria-label="Banner appearances"
                                        defaultValue={banners[1]?.value ?? banners[0]?.value}
                                        className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:gap-5 sm:px-6"
                                    >
                                        {banners.map((banner) => (
                                            <AriaRadio
                                                key={banner.value}
                                                value={banner.value}
                                                className="flex h-max w-full flex-row gap-3 transition-all duration-150 ease-in sm:flex-col"
                                            >
                                                {({ isSelected, isDisabled, isFocusVisible }) => (
                                                    <>
                                                        <section className="relative h-16 w-24 rounded-md bg-utility-gray-100 sm:h-40 sm:w-60 sm:rounded-[10px]">
                                                            <banner.component className="h-full object-cover object-center max-sm:hidden" />
                                                            <banner.componentSM className="h-full object-cover object-center sm:hidden" />

                                                            <span
                                                                className={cx(
                                                                    "pointer-events-none absolute top-0 left-0 z-1 size-full rounded-md ring-1 ring-primary ring-inset sm:rounded-[10px]",
                                                                    isSelected && "ring-2 ring-brand",
                                                                )}
                                                            />

                                                            {banner.value === "custom" && (
                                                                <>
                                                                    <Button
                                                                        size="sm"
                                                                        iconLeading={Code02}
                                                                        color="secondary"
                                                                        className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 max-sm:hidden"
                                                                    >
                                                                        Edit CSS
                                                                    </Button>
                                                                    <Button
                                                                        size="sm"
                                                                        iconLeading={Code02}
                                                                        color="secondary"
                                                                        className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 sm:hidden"
                                                                    />
                                                                    <span className="absolute top-0 left-0 size-full rounded-md bg-linear-to-l from-[rgba(0,0,0,0.02)] to-[rgba(0,0,0,0.17)] to-90% backdrop-blur-[2.14px] sm:rounded-[10px]" />
                                                                </>
                                                            )}
                                                        </section>
                                                        <section className="flex w-full gap-3 sm:gap-3">
                                                            <span className="w-full">
                                                                <p className="text-sm font-semibold text-primary">{banner.label}</p>
                                                                <p className="text-sm text-tertiary">{banner.description}</p>
                                                            </span>

                                                            <RadioButtonBase
                                                                size="sm"
                                                                isSelected={isSelected}
                                                                isDisabled={isDisabled}
                                                                isFocusVisible={isFocusVisible}
                                                            />
                                                        </section>
                                                    </>
                                                )}
                                            </AriaRadio>
                                        ))}
                                    </AriaRadioGroup>
                                    <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 sm:flex-row sm:items-center sm:justify-end sm:px-6 sm:pt-8 sm:pb-6">
                                        <Button size="md" color="link-gray" iconLeading={HelpCircle} className="mr-auto max-sm:hidden">
                                            Need help?
                                        </Button>
                                        <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                            Save changes
                                        </Button>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };
        return <BannerAppearanceComponent />;
    },
};

// Appearance Settings
export const AppearanceSettings: Story = {
    render: () => {
        const AppearanceSettingsComponent = () => {
            const colorSwatches = [
                { name: "gray", value: "#535862" },
                { name: "green", value: "#099250" },
                { name: "blue", value: "#1570EF" },
                { name: "indigo", value: "#444CE7" },
                { name: "purple", value: "#6938EF" },
                { name: "fuchsia", value: "#BA24D5" },
                { name: "pink", value: "#DD2590" },
                { name: "orange", value: "#E04F16" },
            ];

            const [mode, setMode] = useState("system");
            const [isOpen, setIsOpen] = useModalState();

            const [color, setColor] = useState<string>("#7F56D9");
            const [customColor, setCustomColor] = useState<string>(color);

            useEffect(() => {
                const existingColor = colorSwatches.find(({ value }) => value === color);
                if (existingColor) {
                    const shades = ["25", "50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];

                    // Re-map the brand color variables to the existing primitive color variables.
                    shades.forEach((shade) =>
                        document.documentElement.style.setProperty(`--color-brand-${shade}`, `var(--color-${existingColor.name}-${shade})`),
                    );

                    return;
                }

                const shades = generateRgbShades(color);
                if (!shades) return;

                // Set the brand color variables to the new custom color shades.
                Object.entries(shades).forEach(([key, { r, g, b }]) =>
                    document.documentElement.style.setProperty(`--color-brand-${key}`, `rgb(${r} ${g} ${b})`),
                );
            }, [color]);

            const handleCustomColorChange = (value: string | null) => {
                if (!value) return;

                // If the custom color is already selected, update the color.
                if (color === customColor) {
                    setColor(value);
                }

                setCustomColor(value);
            };

            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable className={mode === "light" ? "light-mode" : mode === "dark" ? "dark-mode" : ""}>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-172">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3" />

                                    <div className="flex flex-col gap-4 border-b border-secondary px-4 pt-5 pb-5 sm:px-6 sm:pt-6">
                                        <FeaturedIcon color="gray" size="lg" theme="modern" icon={Contrast01} className="max-sm:hidden" />

                                        <div className="z-10 flex flex-col gap-0.5">
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Appearance
                                            </AriaHeading>
                                            <p className="text-sm text-tertiary">
                                                <span className="max-sm:hidden">Change how your dashboard looks and feels in your browser.</span>
                                                <span className="sm:hidden">How your dashboard looks in your browser.</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-5 px-4 pt-5 sm:px-6">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex flex-col">
                                                <p className="text-sm font-semibold text-primary">Brand color</p>
                                                <p className="text-sm text-tertiary">Update your dashboard to your brand color.</p>
                                            </div>
                                            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                                                <AriaRadioGroup
                                                    aria-label="Brand color"
                                                    aria-describedby="Update your dashboard to your brand color."
                                                    value={color}
                                                    onChange={(value) => setColor(value)}
                                                    className="flex flex-col items-start gap-4 md:flex-row md:items-center"
                                                >
                                                    <div className="flex gap-2">
                                                        {colorSwatches.map((color) => (
                                                            <AriaRadio key={color.name} value={color.value}>
                                                                {({ isSelected, isFocusVisible }) => (
                                                                    <ColorSwatch
                                                                        color={color.value}
                                                                        className={cx(
                                                                            "size-7 cursor-pointer rounded-full outline-1 -outline-offset-1 outline-black/10",
                                                                            (isSelected || isFocusVisible) &&
                                                                                "ring-2 ring-focus-ring ring-offset-2 ring-offset-bg-primary",
                                                                        )}
                                                                    />
                                                                )}
                                                            </AriaRadio>
                                                        ))}
                                                    </div>
                                                    <AriaRadio value={customColor} className="flex shrink-0 items-center gap-3">
                                                        {({ isSelected, isFocusVisible }) => (
                                                            <>
                                                                <Label className="text-sm font-semibold text-secondary">Custom</Label>
                                                                <ColorSwatch
                                                                    color={customColor}
                                                                    className={cx(
                                                                        "size-7 shrink-0 cursor-pointer rounded-full outline-1 -outline-offset-1 outline-black/10",
                                                                        (isSelected || isFocusVisible) &&
                                                                            "ring-2 ring-focus-ring ring-offset-2 ring-offset-bg-primary",
                                                                    )}
                                                                />
                                                                <ColorField
                                                                    aria-label="Custom brand color"
                                                                    className="md:hidden"
                                                                    value={customColor}
                                                                    onChange={(color) => color && handleCustomColorChange(color.toString("hex"))}
                                                                >
                                                                    <InputBase size="sm" wrapperClassName="w-24" />
                                                                </ColorField>
                                                            </>
                                                        )}
                                                    </AriaRadio>
                                                </AriaRadioGroup>
                                                <ColorField
                                                    aria-label="Custom brand color"
                                                    className="max-md:hidden"
                                                    value={customColor}
                                                    onChange={(color) => color && handleCustomColorChange(color.toString("hex"))}
                                                >
                                                    <InputBase size="sm" wrapperClassName="w-24" />
                                                </ColorField>
                                            </div>
                                        </div>
                                        <div className="w-full border-t border-secondary" />
                                        <div className="flex flex-col">
                                            <div className="flex flex-col">
                                                <p className="text-sm font-semibold text-primary">Display preference</p>
                                                <p className="text-sm text-tertiary">Switch between light and dark modes.</p>
                                            </div>
                                            <AriaRadioGroup
                                                aria-label="Display preference"
                                                aria-describedby="Switch between light and dark modes."
                                                className="-mx-4 scrollbar-hide flex flex-row gap-5 overflow-x-auto px-4 pt-5 sm:pt-6"
                                                value={mode}
                                                onChange={setMode}
                                            >
                                                <AriaRadio value="system" className="flex cursor-pointer flex-col gap-3">
                                                    {(props) => (
                                                        <>
                                                            <span className="relative">
                                                                <System
                                                                    className={cx(
                                                                        "z-20",
                                                                        props.isSelected && "rounded-[10px] outline-2 outline-offset-2 outline-focus-ring",
                                                                    )}
                                                                />
                                                                {props.isSelected && (
                                                                    <RadioButtonBase {...props} size="md" className="absolute bottom-2 left-2" />
                                                                )}
                                                            </span>
                                                            <p className="text-sm font-semibold text-primary">System preference</p>
                                                        </>
                                                    )}
                                                </AriaRadio>
                                                <AriaRadio value="light" className="flex cursor-pointer flex-col gap-3">
                                                    {(props) => (
                                                        <>
                                                            <span className="relative">
                                                                <Light
                                                                    className={cx(
                                                                        "z-20",
                                                                        props.isSelected && "rounded-[10px] outline-2 outline-offset-2 outline-focus-ring",
                                                                    )}
                                                                />
                                                                {props.isSelected && (
                                                                    <RadioButtonBase {...props} size="md" className="absolute bottom-2 left-2" />
                                                                )}
                                                            </span>
                                                            <p className="text-sm font-semibold text-primary">Light mode</p>
                                                        </>
                                                    )}
                                                </AriaRadio>
                                                <AriaRadio value="dark" className="flex cursor-pointer flex-col gap-3">
                                                    {(props) => (
                                                        <>
                                                            <span className="relative">
                                                                <Dark
                                                                    className={cx(
                                                                        "z-20",
                                                                        props.isSelected && "rounded-[10px] outline-2 outline-offset-2 outline-focus-ring",
                                                                    )}
                                                                />
                                                                {props.isSelected && (
                                                                    <RadioButtonBase {...props} size="md" className="absolute bottom-2 left-2" />
                                                                )}
                                                            </span>
                                                            <p className="text-sm font-semibold text-primary">Dark mode</p>
                                                        </>
                                                    )}
                                                </AriaRadio>
                                            </AriaRadioGroup>
                                        </div>
                                    </div>
                                    <div className="z-10 flex flex-col pt-6 pb-4 sm:pt-8 sm:pb-6">
                                        <div className="w-full border-t border-secondary" />

                                        <div className="h-4 w-full sm:h-6" />
                                        <div className="flex flex-1 flex-col-reverse gap-3 px-4 sm:flex-row sm:items-center sm:px-6">
                                            <Checkbox id="apply-to-terms" label="Apply to all teams" className="mr-auto max-sm:hidden" />
                                            <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                                Cancel
                                            </Button>
                                            <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                                Save changes
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };
        return <AppearanceSettingsComponent />;
    },
};

// AI Assistant
export const AIAssistant: Story = {
    render: () => {
        const AIAssistantComponent = () => {
            const [isOpen, setIsOpen] = useModalState();
            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full max-w-120 overflow-hidden rounded-2xl bg-primary shadow-xl">
                                    <div className="flex flex-col items-center gap-5 px-4 py-6 text-center md:px-6 md:pt-8">
                                        <Logo />

                                        <div className="w-full md:max-w-xs">
                                            <p className="text-md font-semibold text-quaternary md:text-lg">Hi Olivia,</p>
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary md:text-lg">
                                                Welcome back! How can I help?
                                            </AriaHeading>
                                            <p className="mt-2 text-sm text-tertiary">
                                                I&apos;m here to help tackle your tasks. Choose from the prompts below or tell me what you need!
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col px-4 pb-8 md:px-6">
                                        <div className="flex flex-wrap justify-center gap-2">
                                            <button className="cursor-pointer rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                                <BadgeWithIcon color="success" size="lg" type="modern" iconLeading={ImageUser}>
                                                    Create image
                                                </BadgeWithIcon>
                                            </button>
                                            <button className="cursor-pointer rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                                <BadgeWithIcon color="blue" size="lg" type="modern" iconLeading={BarChart04}>
                                                    Analyze data
                                                </BadgeWithIcon>
                                            </button>
                                            <button className="cursor-pointer rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                                <BadgeWithIcon color="purple" size="lg" type="modern" iconLeading={Zap}>
                                                    Make a plan
                                                </BadgeWithIcon>
                                            </button>
                                            <button className="cursor-pointer rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                                <BadgeWithIcon color="pink" size="lg" type="modern" iconLeading={File02}>
                                                    Summarize text
                                                </BadgeWithIcon>
                                            </button>
                                            <button className="cursor-pointer rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                                <BadgeWithIcon color="orange" size="lg" type="modern" iconLeading={Edit04}>
                                                    Help me write
                                                </BadgeWithIcon>
                                            </button>
                                            <button className="cursor-pointer rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                                <BadgeWithIcon color="gray" size="lg" type="modern" iconLeading={Stars02}>
                                                    More
                                                </BadgeWithIcon>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col px-4 pb-4 md:px-5 md:pb-5">
                                        <MessageActionAdvanced />
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };
        return <AIAssistantComponent />;
    },
};

const Divider = () => (
    <svg className="h-[2.5px] w-full max-md:hidden">
        <line
            x1="1.2"
            y1="1.2"
            x2="100%"
            y2="1.2"
            className="stroke-border-primary"
            stroke="black"
            strokeWidth="2.4"
            strokeDasharray="0,6"
            strokeLinecap="round"
        />
    </svg>
);

// User Settings
export const UserSettings: Story = {
    render: () => {
        const UserSettingsComponent = () => {
            const [isOpen, setIsOpen] = useModalState();

            const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                setIsOpen(false);
            };

            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-[20px] bg-primary shadow-xl sm:max-w-160">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="dark" size="md" className="absolute top-3 right-3 md:hidden" />
                                    <CloseButton onClick={() => setIsOpen(false)} theme="dark" size="lg" className="absolute top-3 right-3 max-md:hidden" />

                                    <div className="px-2 pt-2">
                                        <img
                                            aria-hidden="true"
                                            src="https://www.untitledui.com/application/clouds.webp"
                                            className="h-26 w-full rounded-xl object-cover md:h-32"
                                            alt="Clouds"
                                        />
                                    </div>

                                    <div className="relative -mt-12 flex flex-col gap-3 px-4 pb-6 md:gap-4 md:px-6">
                                        <AvatarProfilePhoto
                                            size="sm"
                                            alt="Sienna Hewitt"
                                            src="https://www.untitledui.com/images/avatars/transparent/sienna-hewitt?bg=%23E9DCBB"
                                            className="md:hidden"
                                        />
                                        <AvatarProfilePhoto
                                            size="md"
                                            alt="Sienna Hewitt"
                                            src="https://www.untitledui.com/images/avatars/transparent/sienna-hewitt?bg=%23E9DCBB"
                                            className="max-md:hidden"
                                        />

                                        <div className="absolute top-14 right-4 flex gap-0.5 md:top-15 md:right-6">
                                            <ButtonUtility tooltip="Archive" icon={Archive} size="xs" color="tertiary" />
                                            <ButtonUtility tooltip="Edit" icon={Edit01} size="xs" color="tertiary" />
                                        </div>

                                        <div className="flex flex-col items-start gap-4 md:flex-row md:gap-8">
                                            <div className="max-w-50 min-w-0 flex-1">
                                                <div className="flex items-center gap-1.5">
                                                    <p className="truncate text-lg font-semibold text-primary">Sienna Hewitt</p>
                                                    <VerifiedTick size="lg" />
                                                </div>
                                                <p className="truncate text-sm text-tertiary">@siennahewitt</p>
                                            </div>
                                            <dl className="flex items-center gap-4">
                                                <div className="flex flex-col gap-0.5">
                                                    <dt className="text-xs font-medium text-quaternary">Followers</dt>
                                                    <dd className="text-md font-semibold text-primary">32,086</dd>
                                                </div>

                                                <hr className="h-11 w-px rounded-full border-none bg-border-primary" />

                                                <div className="flex flex-col gap-0.5">
                                                    <dt className="text-xs font-medium text-quaternary">Following</dt>
                                                    <dd className="text-md font-semibold text-primary">4,698</dd>
                                                </div>

                                                <hr className="h-11 w-px rounded-full border-none bg-border-primary" />

                                                <div className="flex flex-col gap-0.5">
                                                    <dt className="text-xs font-medium text-quaternary">Posts</dt>
                                                    <dd className="text-md font-semibold text-primary">128</dd>
                                                </div>

                                                <hr className="h-11 w-px rounded-full border-none bg-border-primary" />

                                                <div className="flex flex-col gap-0.5">
                                                    <dt className="text-xs font-medium text-quaternary">Collections</dt>
                                                    <dd className="text-md font-semibold text-primary">24</dd>
                                                </div>
                                            </dl>
                                        </div>
                                    </div>

                                    <form id="user-settings-form" onSubmit={handleSubmit} className="flex flex-col gap-4 px-4 md:px-6">
                                        <Divider />

                                        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
                                            <label htmlFor="firstname" className="w-full max-w-50 text-sm font-medium text-secondary max-md:hidden">
                                                Name
                                            </label>
                                            <div className="flex items-end gap-4">
                                                <Input
                                                    isRequired
                                                    id="firstname"
                                                    size="sm"
                                                    name="firstname"
                                                    label="Name"
                                                    className="md:label:hidden"
                                                    defaultValue="Sienna"
                                                />
                                                <Input
                                                    isRequired
                                                    id="lastname"
                                                    size="sm"
                                                    name="lastname"
                                                    label="Last name"
                                                    className="label:hidden"
                                                    defaultValue="Hewitt"
                                                />
                                            </div>
                                        </div>

                                        <Divider />

                                        <div className="flex flex-col gap-8 md:flex-row">
                                            <label htmlFor="email" className="w-full max-w-50 text-sm font-medium text-secondary max-md:hidden">
                                                Email
                                            </label>
                                            <div className="flex flex-1 flex-col gap-2">
                                                <Input
                                                    isRequired
                                                    id="email"
                                                    type="email"
                                                    size="sm"
                                                    name="email"
                                                    label="Email"
                                                    className="md:label:hidden"
                                                    icon={Mail01}
                                                    defaultValue="hi@siennahewitt.com"
                                                />

                                                <div className="flex items-center gap-1.5">
                                                    <VerifiedTick size="lg" />
                                                    <p className="text-xs font-semibold text-utility-blue-600">Verified 2 Jan, 2025</p>
                                                </div>
                                            </div>
                                        </div>

                                        <Divider />

                                        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
                                            <label htmlFor="bio" className="w-full max-w-50 text-sm font-medium text-secondary max-md:hidden">
                                                Username
                                            </label>
                                            <div className="relative flex flex-1 items-center">
                                                <InputGroup
                                                    isRequired
                                                    id="username"
                                                    size="sm"
                                                    name="username"
                                                    label="Username"
                                                    defaultValue="siennahewitt"
                                                    className="md:label:hidden"
                                                    leadingAddon={<InputGroup.Prefix>untitledui.com/@</InputGroup.Prefix>}
                                                >
                                                    <InputBase />
                                                </InputGroup>
                                                <CheckCircle className="absolute right-3 bottom-3 z-10 size-4 text-fg-success-primary" />
                                            </div>
                                        </div>

                                        <Divider />

                                        <div className="flex flex-col gap-4 max-md:hidden md:flex-row md:gap-8">
                                            <label htmlFor="bio" className="w-full max-w-50 text-sm font-medium text-secondary max-md:hidden">
                                                Country
                                            </label>

                                            <Select
                                                isRequired
                                                name="country"
                                                label="Country"
                                                hint="Estimates based on recent IP address."
                                                size="sm"
                                                defaultSelectedKey="AU"
                                                className="flex-1 md:label:hidden"
                                                items={countriesOptions.map((item) => ({
                                                    ...item,
                                                    supportingText: "UTC/GMT +10",
                                                }))}
                                            >
                                                {(item) => (
                                                    <Select.Item id={item.id} icon={item.icon} supportingText={item.supportingText}>
                                                        {item.label}
                                                    </Select.Item>
                                                )}
                                            </Select>
                                        </div>

                                        <Divider />
                                    </form>

                                    <div className="z-10 flex flex-col pt-6 pb-4 sm:pt-8 sm:pb-6">
                                        <div className="flex flex-1 flex-col-reverse gap-3 px-4 sm:grid sm:grid-cols-2 sm:px-6">
                                            <Button color="secondary" size="md" iconLeading={Save01} onClick={() => setIsOpen(false)}>
                                                Save as draft
                                            </Button>
                                            <Button type="submit" form="user-settings-form" color="primary" size="md">
                                                Publish changes
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };
        return <UserSettingsComponent />;
    },
};

// New Project
export const NewProject: Story = {
    render: () => {
        const NewProjectComponent = () => {
            const [isOpen, setIsOpen] = useModalState();

            const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
            const [uploadedFilePreview, setUploadedFilePreview] = useState<string | null>(null);

            useEffect(() => {
                // Clean up the preview URL when the component unmounts.
                return () => {
                    if (uploadedFilePreview) {
                        URL.revokeObjectURL(uploadedFilePreview);
                    }
                };
            }, [uploadedFilePreview]);

            const uploadFile = (file: File, onProgress: (progress: number) => void) => {
                // Replace this with your own upload logic
                let progress = 0;

                const interval = setInterval(() => {
                    onProgress(++progress);
                    if (progress === 100) {
                        clearInterval(interval);
                    }
                }, 100);
            };

            const handleDropFiles = (files: FileList) => {
                const newFiles = Array.from(files);
                const fileToUpload = newFiles[0];
                if (!fileToUpload) return; // Guard against undefined file

                const filePreview = URL.createObjectURL(fileToUpload);
                const uploadedFileObject = {
                    name: fileToUpload.name,
                    type: fileToUpload.type,
                    progress: 0,
                    failed: false,
                    size: fileToUpload.size,
                };

                setUploadedFilePreview(filePreview);
                setUploadedFile(uploadedFileObject);

                uploadFile(fileToUpload, (progress) => {
                    setUploadedFile((prev) => (prev ? { ...prev, progress } : uploadedFileObject));
                });
            };

            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-120">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3" />
                                    <div className="flex flex-col gap-0.5 px-4 pt-5 pb-5 sm:px-6 sm:pt-6">
                                        <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                            Create a new project
                                        </AriaHeading>
                                        <p className="text-sm text-tertiary">Upload an image to create a new project.</p>
                                    </div>

                                    {uploadedFile && (
                                        <div className="px-4 sm:px-6">
                                            <div className="relative aspect-[1.33] w-full overflow-hidden rounded-xl">
                                                {uploadedFilePreview && (
                                                    <>
                                                        <img alt={uploadedFile.name} src={uploadedFilePreview} className="size-full object-cover" />
                                                        <img
                                                            alt="Uploaded file preview"
                                                            aria-hidden="true"
                                                            style={{
                                                                clipPath: `inset(0 0 0 ${uploadedFile.progress}%)`,
                                                                opacity: uploadedFile.progress < 100 ? 1 : 0,
                                                            }}
                                                            src={uploadedFilePreview}
                                                            className="absolute inset-0 size-full object-cover blur-xs transition-all duration-200 ease-linear"
                                                        />
                                                        <div
                                                            aria-hidden="true"
                                                            style={{
                                                                clipPath: `inset(0 0 0 ${uploadedFile.progress}%)`,
                                                                opacity: uploadedFile.progress < 100 ? 1 : 0,
                                                            }}
                                                            className="absolute inset-0 bg-white/70 transition-all duration-200 ease-linear"
                                                        />
                                                    </>
                                                )}
                                                <p
                                                    style={{
                                                        opacity: uploadedFile.progress < 100 ? 1 : 0,
                                                    }}
                                                    className="absolute right-4 bottom-3 text-display-2xl font-semibold text-fg-quaternary text-shadow-[0px_0px_48px_rgba(0,0,0,.1)]"
                                                >
                                                    {uploadedFile.progress}%
                                                </p>
                                                <div className="absolute inset-0 rounded-xl border border-secondary_alt"></div>
                                            </div>
                                        </div>
                                    )}

                                    {!uploadedFile && (
                                        <FileUploadComponent.Root className="mt-4 flex flex-col gap-4 px-4 sm:px-6">
                                            <FileUploadComponent.DropZone allowsMultiple={false} accept="image/*" onDropFiles={handleDropFiles} />
                                        </FileUploadComponent.Root>
                                    )}

                                    <div className="mt-4 flex flex-col gap-4 px-4 sm:px-6 md:mt-5">
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <Input label="Project name" size="sm" defaultValue="About us" />
                                            <Select
                                                label="Team"
                                                size="sm"
                                                placeholderIcon={User01}
                                                defaultSelectedKey="watchtower"
                                                items={[
                                                    {
                                                        id: "ephemeral",
                                                        label: "Ephemeral",
                                                        avatarUrl: "https://www.untitledui.com/logos/images/Ephemeral.jpg",
                                                    },
                                                    {
                                                        id: "watchtower",
                                                        label: "Watchtower",
                                                        avatarUrl: "https://www.untitledui.com/logos/images/Watchtower.jpg",
                                                    },
                                                    {
                                                        id: "leapyear",
                                                        label: "Leapyear",
                                                        avatarUrl: "https://www.untitledui.com/logos/images/Leapyear.jpg",
                                                    },
                                                ]}
                                            >
                                                {(item) => (
                                                    <Select.Item id={item.id} avatarUrl={item.avatarUrl} supportingText={item.supportingText}>
                                                        {item.label}
                                                    </Select.Item>
                                                )}
                                            </Select>
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            <TextArea label="Add tags (optional)" placeholder="Type to search..." textAreaClassName="h-25.5" />
                                            <div className="flex flex-wrap gap-2">
                                                <button className="cursor-pointer rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                                    <BadgeWithIcon color="gray" type="modern" size="md" iconLeading={Plus}>
                                                        User interface
                                                    </BadgeWithIcon>
                                                </button>
                                                <button className="cursor-pointer rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                                    <BadgeWithIcon color="gray" type="modern" size="md" iconLeading={Plus}>
                                                        Figma
                                                    </BadgeWithIcon>
                                                </button>
                                                <button className="cursor-pointer rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                                    <BadgeWithIcon color="gray" type="modern" size="md" iconLeading={Plus}>
                                                        UI Design
                                                    </BadgeWithIcon>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 sm:flex-row sm:items-center sm:px-6 sm:pt-8 sm:pb-6">
                                        <Button color="link-gray" size="md" className="mr-auto max-md:hidden">
                                            Save as draft
                                        </Button>
                                        <Button color="secondary" size="md" iconLeading={CalendarCheck02} onClick={() => setIsOpen(false)}>
                                            Schedule
                                        </Button>
                                        <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                            Create project
                                        </Button>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };
        return <NewProjectComponent />;
    },
};

// Text Editor
export const TextEditorModal: Story = {
    render: () => {
        const TextEditorModalComponent = () => {
            const [isOpen, setIsOpen] = useModalState();
            const [content, setContent] = useState(
                "<p>We need another and a wiser and perhaps a more mystical concept of animals. Remote from universal nature, and living by complicated artifice, man in civilization surveys the creature through the glass of his knowledge and sees thereby a feather magnified and the whole image in distortion.</p><p></p><p>We patronize them for their incompleteness, for their tragic fate of having taken form so far below ourselves. And therein we err, and greatly err. For the animal shall not be measured by man.</p><p></p><p>In a world older and more complete than ours they move finished and complete, gifted with extensions of the senses we have lost or never attained, living by voices we shall never hear. They are not brethren, they are not underlings; they are other nations, caught with ourselves in the net of life and time, fellow prisoners of the splendour and travail of the earth.</p>",
            );

            return (
                <AriaDialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                    <ModalOverlay isDismissable>
                        <Modal>
                            <Dialog>
                                <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-180">
                                    <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3" />
                                    <div className="flex flex-col gap-4 px-4 pt-5 pb-5 sm:px-6 sm:pt-6">
                                        <div className="relative w-max max-sm:hidden">
                                            <FeaturedIcon color="gray" size="lg" theme="modern" icon={Edit04} />
                                            <BackgroundPattern
                                                pattern="circle"
                                                size="sm"
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                            />
                                        </div>
                                        <div className="z-10 flex flex-col gap-0.5">
                                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                                Edit featured excerpt
                                            </AriaHeading>
                                            <p className="text-sm text-tertiary">This will be displayed on your profile.</p>
                                        </div>
                                    </div>

                                    <div className="px-4 sm:px-6">
                                        <TextEditor.Root
                                            content={content}
                                            onUpdate={({ editor }) => setContent(editor.getHTML())}
                                            className="w-full max-md:gap-2"
                                            inputClassName="h-90 max-md:p-4 md:h-101 w-full resize-y"
                                        >
                                            <TextEditor.Toolbar type="simple" className="md:hidden" />
                                            <TextEditor.Toolbar hideFontSize type="advanced" className="max-md:hidden" />

                                            <div className="flex flex-col gap-2">
                                                <TextEditor.Content />
                                                <TextEditor.HintText />
                                            </div>
                                        </TextEditor.Root>
                                    </div>
                                    <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 sm:flex-row sm:items-center sm:px-6 sm:pt-8 sm:pb-6">
                                        <Button color="link-gray" size="md" iconLeading={Stars02} className="mr-auto max-md:hidden">
                                            Ask AI
                                        </Button>
                                        <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                            Save changes
                                        </Button>
                                    </div>
                                </div>
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </AriaDialogTrigger>
            );
        };
        return <TextEditorModalComponent />;
    },
};
