import React, { useState } from 'react';
import './NewToggle.css';
import getBackgroundColor from "../ToggleButton/getBackgroundColor";

export function NewToggle(props) {
    const disabled = false;
    const offColor = "#888";
    const onColor = "#080";
    const offHandleColor = "#fff";
    const onHandleColor = "#fff";
    const boxShadow = null;
    const activeBoxShadow = "0 0 2px 3px #3bf";
    const height = 28;
    const width = 56;
    const checkedPos = Math.max(
        width - props.handleDiameter - height,
        width - props.handleDiameter - (height + props.handleDiameter) / 2
    );
    const uncheckedPos = Math.max(0, (height - props.handleDiameter) / 2);
    const [pos, setPos] = useState(props.checked ? checkedPos : uncheckedPos);
    const [isDragging, setIsDragging] = useState(false);


    /*  const pos = () => {
         setPos(props.checked ? checkedPos : uncheckedPos);
     }; */

    const rootStyle = {
        position: "relative",
        display: "inline-block",
        textAlign: "left",
        opacity: disabled ? 0.5 : 1,
        direction: "ltr",
        borderRadius: height / 2,
        WebkitTransition: "opacity 0.25s",
        MozTransition: "opacity 0.25s",
        transition: "opacity 0.25s",
        touchAction: "none",
        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        userSelect: "none"
    };
    const backgroundStyle = {
        height,
        width,
        margin: Math.max(0, (props.handleDiameter - height) / 2),
        position: "relative",
        background: getBackgroundColor(
            pos,
            checkedPos,
            uncheckedPos,
            offColor,
            onColor
        ),
        borderRadius: height / 2,
        cursor: disabled ? "default" : "pointer",
        WebkitTransition: isDragging ? null : "background 0.25s",
        MozTransition: isDragging ? null : "background 0.25s",
        transition: isDragging ? null : "background 0.25s"
    };

    const checkedIconStyle = {
        height,
        width: Math.min(
            height * 1.5,
            width - (props.handleDiameter + height) / 2 + 1
        ),
        position: "relative",
        opacity:
            (pos - uncheckedPos) / (checkedPos - uncheckedPos),
        pointerEvents: "none",
        WebkitTransition: isDragging ? null : "opacity 0.25s",
        MozTransition: isDragging ? null : "opacity 0.25s",
        transition: isDragging ? null : "opacity 0.25s"
    };

    const uncheckedIconStyle = {
        height,
        width: Math.min(
            height * 1.5,
            width - (props.handleDiameter + height) / 2 + 1
        ),
        position: "absolute",
        opacity:
            1 -
            (pos - uncheckedPos) / (checkedPos - uncheckedPos),
        right: 0,
        top: 0,
        pointerEvents: "none",
        WebkitTransition: isDragging ? null : "opacity 0.25s",
        MozTransition: isDragging ? null : "opacity 0.25s",
        transition: isDragging ? null : "opacity 0.25s"
    };

    const handleStyle = {
        height: props.handleDiameter,
        width: props.handleDiameter * 2,
        background: getBackgroundColor(
            pos,
            checkedPos,
            uncheckedPos,
            offHandleColor,
            onHandleColor
        ),
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? "default" : "pointer",
        borderRadius: height / 2,
        fontFamily: "Josefin Sans, sans-serif",
        color: '#676767',
        fontSize: '0.8em',
        fontWeight: 500,
        boxShadow: '2px 2px 7px #6b6b6b',
        position: "absolute",
        transform: `translateX(${pos}px)`,
        top: Math.max(0, (height - props.handleDiameter) / 2),
        outline: 0,
        //boxShadow: $hasOutline ? activeBoxShadow : boxShadow,
        border: 0,
        WebkitTransition: isDragging
            ? null
            : "background-color 0.25s, transform 0.25s, box-shadow 0.15s",
        MozTransition: isDragging
            ? null
            : "background-color 0.25s, transform 0.25s, box-shadow 0.15s",
        transition: isDragging
            ? null
            : "background-color 0.25s, transform 0.25s, box-shadow 0.15s"
    };

    const inputStyle = {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        width: 1
    };

    const onClick = (event) => {
        /* event.preventDefault();
        inputRef.focus();
        onChange(event);
        this.setState({ $hasOutline: false }); */
        console.log('clicked!');
    }
    const onDragStart = (clientX) => {
        /*        this.$inputRef.focus();
               this.setState({
                   $startX: clientX,
                   $hasOutline: true,
                   $dragStartingTime: Date.now()
               }); */
    }

    const onMouseDown = (event) => {
        /*         event.preventDefault();
                // Ignore right click and scroll
                if (typeof event.button === "number" && event.button !== 0) {
                    return;
                }
        
                onDragStart(event.clientX);
                window.addEventListener("mousemove", this.$onMouseMove);
                window.addEventListener("mouseup", this.$onMouseUp); */
    }

    const onTouchStart = (event) => {
        /*         this.$checkedStateFromDragging = null;
                onDragStart(event.touches[0].clientX); */
    }

    const onTouchMove = (event) => {
        /*   onDrag(event.touches[0].clientX); */
    }

    const onTouchEnd = (event) => {
        /*        event.preventDefault();
               onDragStop(event); */
    }

    const unsetHasOutline = () => {
        //this.setState({ $hasOutline: false });
    }

    const getInputRef = (el) => {
        /*  this.$inputRef = el; */
    }

    const setHasOutline = () => {
        /*   this.setState({ $hasOutline: true }); */
    }

    const onKeyUp = () => {
        /*   this.$lastKeyUpAt = Date.now(); */
    }

    const onInputChange = (event) => {
        // This condition is unfortunately needed in some browsers where the input's change event might get triggered
        // right after the dragstop event is triggered (occurs when dropping over a label element)
        /*         if (Date.now() - this.$lastDragAt > 50) {
                    this.$onChange(event);
                    // Prevent clicking label, but not key activation from setting outline to true - yes, this is absurd
                    if (Date.now() - this.$lastKeyUpAt > 50) {
                        this.setState({ $hasOutline: false });
                    }
                } */
    }

    return (
        <div className="toggleSwitch-container">
            <div className="toggleSwitch" style={({ ...rootStyle, ...props.rootStyleCustom })}>
                <div
                    className="react-switch-bg"
                    style={({ ...backgroundStyle, ...props.backgroundStyleCustom })}
                    onClick={disabled ? null : onClick}
                    onMouseDown={e => e.preventDefault()}
                >
                    {props.checkedIcon && <div style={checkedIconStyle}>{props.checkedIcon}</div>}
                    {props.uncheckedIcon && (
                        <div style={uncheckedIconStyle}>{props.uncheckedIcon}</div>
                    )}
                </div>
                <div
                    className="react-switch-handle"
                    style={handleStyle}
                    onClick={e => e.preventDefault()}
                    onMouseDown={disabled ? null : onMouseDown}
                    onTouchStart={disabled ? null : onTouchStart}
                    onTouchMove={disabled ? null : onTouchMove}
                    onTouchEnd={disabled ? null : onTouchEnd}
                    onTouchCancel={disabled ? null : unsetHasOutline}
                >{props.checked ? 'Søg' : 'Skan'}</div>
                <input
                    type="checkbox"
                    role="switch"
                    disabled={disabled}
                    style={inputStyle}
                    {...props.rest}
                    /* anything below should NOT get overriden by ...rest */
                    ref={getInputRef}
                    onFocus={setHasOutline}
                    onBlur={unsetHasOutline}
                    onKeyUp={onKeyUp}
                    onChange={onInputChange}
                />
            </div>
        </div>
    )
}