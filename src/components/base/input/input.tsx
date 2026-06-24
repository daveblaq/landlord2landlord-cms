"use client";

import { type ComponentType, type HTMLAttributes, type ReactNode, type Ref, createContext, useContext, useState } from "react";
import { HelpCircle, InfoCircle, Eye, EyeOff } from "@untitledui/icons";
import type { InputProps as AriaInputProps, TextFieldProps as AriaTextFieldProps } from "react-aria-components";
import { Group as AriaGroup, Input as AriaInput, TextField as AriaTextField } from "react-aria-components";
import { HintText } from "@/components/base/input/hint-text";
import { Label } from "@/components/base/input/label";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { cx, sortCx } from "@/utils/cx";

export interface InputBaseProps extends TextFieldProps {
    /** Tooltip message on hover. */
    tooltip?: string;
    /**
     * Input size.
     * @default "sm"
     */
    size?: "sm" | "md" | "lg";
    /** Placeholder text. */
    placeholder?: string;
    /** Class name for the icon. */
    iconClassName?: string;
    /** Class name for the input. */
    inputClassName?: string;
    /** Class name for the input wrapper. */
    wrapperClassName?: string;
    /** Class name for the tooltip. */
    tooltipClassName?: string;
    /** Keyboard shortcut to display. */
    shortcut?: string | boolean;
    ref?: Ref<HTMLInputElement>;
    groupRef?: Ref<HTMLDivElement>;
    /** Icon component to display on the left side of the input. */
    icon?: ComponentType<HTMLAttributes<HTMLOrSVGElement>>;
    /** Whether to show password toggle button if type is "password" */
    showPasswordToggle?: boolean;
}

export const InputBase = ({
    ref,
    tooltip,
    shortcut,
    groupRef,
    size = "sm",
    isInvalid,
    isDisabled,
    icon: Icon,
    placeholder,
    wrapperClassName,
    tooltipClassName,
    inputClassName,
    iconClassName,
    // Omit this prop to avoid invalid HTML attribute warning
    isRequired: _isRequired,
    type,
    showPasswordToggle = true,
    onChange,
    ...inputProps
}: Omit<InputBaseProps, "label" | "hint">) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPassword = type === "password";
    const resolvedType = isPassword ? (isPasswordVisible ? "text" : "password") : type;

    // Check if the input has a leading icon or tooltip
    const hasTrailingIcon = tooltip || isInvalid || (isPassword && showPasswordToggle);
    const hasLeadingIcon = Icon;

    // If the input is inside a `TextFieldContext`, use its context to simplify applying styles
    const context = useContext(TextFieldContext);

    const inputSize = context?.size || size;

    const sizes = sortCx({
        sm: {
            root: cx("px-3.5", hasTrailingIcon && "pr-9", hasLeadingIcon && "pl-9"),
            iconLeading: "left-3",
            iconTrailing: "right-3",
            shortcut: "pr-1.5",
        },
        md: {
            root: cx("px-4", hasTrailingIcon && "pr-9.5", hasLeadingIcon && "pl-11"),
            iconLeading: "left-4",
            iconTrailing: "right-4",
            shortcut: "pr-3",
        },
        lg: {
            root: cx("px-4 text-md", hasTrailingIcon && "pr-10.5", hasLeadingIcon && "pl-12"),
            iconLeading: "left-4",
            iconTrailing: "right-4",
            shortcut: "pr-3.5",
        },
    });

    return (
        <AriaGroup
            {...{ isDisabled, isInvalid }}
            ref={groupRef}
            className={({ isFocusWithin, isDisabled, isInvalid }) =>
                cx(
                    "relative flex h-10 w-full flex-row place-content-center place-items-center rounded-lg bg-primary ring-1 ring-primary transition-shadow duration-100 ease-linear ring-inset",

                    isFocusWithin && !isDisabled && "ring-2 ring-brand",

                    // Disabled state styles
                    isDisabled && "cursor-not-allowed bg-disabled_subtle ring-disabled",
                    "group-disabled:cursor-not-allowed group-disabled:bg-disabled_subtle group-disabled:ring-disabled",

                    // Invalid state styles
                    isInvalid && "ring-error_subtle",
                    "group-invalid:ring-error_subtle",

                    // Invalid state with focus-within styles
                    isInvalid && isFocusWithin && "ring-2 ring-error",
                    isFocusWithin && "group-invalid:ring-2 group-invalid:ring-error",

                    context?.wrapperClassName,
                    wrapperClassName,
                )
            }
        >
            {/* Leading icon and Payment icon */}
            {Icon && (
                <Icon
                    className={cx(
                        "pointer-events-none absolute size-5 text-fg-quaternary",
                        isDisabled && "text-fg-disabled",
                        sizes[inputSize].iconLeading,
                        context?.iconClassName,
                        iconClassName,
                    )}
                />
            )}

            {/* Input field */}
            <AriaInput
                {...(inputProps as AriaInputProps)}
                type={resolvedType}
                ref={ref}
                placeholder={placeholder}
                className={cx(
                    "m-0 w-full bg-transparent text-sm font-medium text-primary ring-0 outline-hidden placeholder:text-placeholder placeholder:font-normal autofill:rounded-lg autofill:text-primary",
                    isDisabled && "cursor-not-allowed text-disabled",
                    sizes[inputSize].root,
                    isPassword && showPasswordToggle && (
                        tooltip || isInvalid
                            ? (inputSize === "lg" ? "pr-[68px]" : inputSize === "md" ? "pr-[62px]" : "pr-[60px]")
                            : ""
                    ),
                    context?.inputClassName,
                    inputClassName,
                )}
            />

            {/* Password toggle button */}
            {isPassword && showPasswordToggle && (
                <button
                    type="button"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    disabled={isDisabled}
                    className={cx(
                        "absolute z-10 cursor-pointer text-fg-quaternary transition duration-200 hover:text-fg-quaternary_hover focus:text-fg-quaternary_hover outline-hidden",
                        sizes[inputSize].iconTrailing,
                        isDisabled && "cursor-not-allowed text-fg-disabled",
                    )}
                >
                    {isPasswordVisible ? (
                        <EyeOff className="size-5" />
                    ) : (
                        <Eye className="size-5" />
                    )}
                </button>
            )}

            {/* Tooltip and help icon */}
            {tooltip && !isInvalid && (
                <Tooltip title={tooltip} placement="top">
                    <TooltipTrigger
                        className={cx(
                            "absolute cursor-pointer text-fg-quaternary transition duration-200 hover:text-fg-quaternary_hover focus:text-fg-quaternary_hover",
                            isPassword && showPasswordToggle
                                ? (inputSize === "lg" ? "right-10.5" : inputSize === "md" ? "right-9.5" : "right-9")
                                : sizes[inputSize].iconTrailing,
                            context?.tooltipClassName,
                            tooltipClassName,
                        )}
                    >
                        <HelpCircle className="size-4" />
                    </TooltipTrigger>
                </Tooltip>
            )}

            {/* Invalid icon */}
            {isInvalid && (
                <InfoCircle
                    className={cx(
                        "pointer-events-none absolute size-4 text-fg-error-secondary",
                        isPassword && showPasswordToggle
                            ? (inputSize === "lg" ? "right-10.5" : inputSize === "md" ? "right-9.5" : "right-9")
                            : sizes[inputSize].iconTrailing,
                        context?.tooltipClassName,
                        tooltipClassName,
                    )}
                />
            )}

            {/* Shortcut */}
            {shortcut && (
                <div
                    className={cx(
                        "pointer-events-none absolute inset-y-0.5 right-0.5 z-10 flex items-center rounded-r-[inherit] bg-linear-to-r from-transparent to-bg-primary to-40% pl-8",
                        sizes[inputSize].shortcut,
                    )}
                >
                    <span
                        className={cx(
                            "pointer-events-none rounded px-1 py-px text-xs font-medium text-quaternary ring-1 ring-secondary select-none ring-inset",
                            isDisabled && "bg-transparent text-disabled",
                        )}
                        aria-hidden="true"
                    >
                        {typeof shortcut === "string" ? shortcut : "⌘K"}
                    </span>
                </div>
            )}
        </AriaGroup>
    );
};

InputBase.displayName = "InputBase";

interface BaseProps {
    /** Label text for the input */
    label?: string;
    /** Helper text displayed below the input */
    hint?: ReactNode;
}

interface TextFieldProps
    extends BaseProps,
        AriaTextFieldProps,
        Pick<InputBaseProps, "size" | "wrapperClassName" | "inputClassName" | "iconClassName" | "tooltipClassName"> {
    ref?: Ref<HTMLDivElement>;
}

const TextFieldContext = createContext<TextFieldProps>({});

export const TextField = ({ className, ...props }: TextFieldProps) => {
    return (
        <TextFieldContext.Provider value={props}>
            <AriaTextField
                {...props}
                data-input-wrapper
                className={(state) =>
                    cx("group flex h-max w-full flex-col items-start justify-start gap-1.5", typeof className === "function" ? className(state) : className)
                }
            />
        </TextFieldContext.Provider>
    );
};

TextField.displayName = "TextField";

interface InputProps extends InputBaseProps, BaseProps {
    /** Whether to hide required indicator from label */
    hideRequiredIndicator?: boolean;
}

export const Input = ({
    size = "sm",
    placeholder,
    icon: Icon,
    label,
    hint,
    shortcut,
    hideRequiredIndicator,
    className,
    ref,
    groupRef,
    tooltip,
    iconClassName,
    inputClassName,
    wrapperClassName,
    tooltipClassName,
    ...props
}: InputProps) => {
    return (
        <TextField aria-label={!label ? placeholder : undefined} {...props} className={className}>
            {({ isRequired, isInvalid }) => (
                <>
                    {label && <Label isRequired={hideRequiredIndicator ? !hideRequiredIndicator : isRequired}>{label}</Label>}

                    <InputBase
                        {...{
                            ref,
                            groupRef,
                            size,
                            placeholder,
                            icon: Icon,
                            shortcut,
                            iconClassName,
                            inputClassName,
                            wrapperClassName,
                            tooltipClassName,
                            tooltip,
                        }}
                        isInvalid={isInvalid}
                        {...props}
                    />

                    {hint && <HintText isInvalid={isInvalid}>{hint}</HintText>}
                </>
            )}
        </TextField>
    );
};

Input.displayName = "Input";
