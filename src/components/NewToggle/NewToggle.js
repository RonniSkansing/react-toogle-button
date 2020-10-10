import React, { useState, useEffect } from 'react';
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
    const checkedPos = Math.max(
        props.width - props.handleDiameter - props.height,
        props.width - props.handleDiameter - (props.height + props.handleDiameter) / 2
    );
    const uncheckedPos = Math.max(0, (props.height - props.handleDiameter) / 2);
    const [pos, setPos] = useState(props.checked ? checkedPos : uncheckedPos);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(null);
    const [dragStartingTime, setDragStartingTime] = useState(null);
    const [lastDragAt, setLastDragAt] = useState(null);
    const [inputRef, setInputRef] = useState(null);
    const [lastKeyUpAt, setLastKeyUpAt] = useState(null);

    useEffect(() => {
        /*      if (prevProps.checked === props.checked) {
                 return;
             } */

        setPos(props.checked ? checkedPos : uncheckedPos)
    });

    const rootStyle = {
        opacity: disabled ? 0.5 : 1,
        borderRadius: props.height / 2,
    };
    const backgroundStyle = {
        height: props.height,
        width: props.width,
        margin: Math.max(0, (props.handleDiameter - props.height) / 2),
        position: "relative",
        background: getBackgroundColor(
            pos,
            checkedPos,
            uncheckedPos,
            offColor,
            onColor
        ),
        borderRadius: props.height / 2,
        cursor: disabled ? "default" : "pointer",
        WebkitTransition: isDragging ? null : "background 0.25s",
        MozTransition: isDragging ? null : "background 0.25s",
        transition: isDragging ? null : "background 0.25s"
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
        borderRadius: props.height / 2,
        transform: `translateX(${pos}px)`,
        top: Math.max(0, (props.height - props.handleDiameter) / 2),
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

    const onChange = (event) => {
        props.onChange(!props.checked, event, props.id);
    }

    const onClick = (event) => {
        event.preventDefault();
        inputRef.focus();
        onChange(event);
        console.log('clicked!');
    }
    const onDragStart = (clientX) => {
        inputRef.focus();
        setStartX(clientX)
        setDragStartingTime(Date.now())
    }
    const onDragStop = (event) => {
        const halfwayCheckpoint = (checkedPos + uncheckedPos) / 2;

        const timeSinceStart = Date.now() - dragStartingTime;
        if (!isDragging || timeSinceStart < 250) {
            onChange(event);

        } else if (props.checked) {
            if (pos > halfwayCheckpoint) {
                setPos(checkedPos);
            } else {
                onChange(event);
            }
        } else if (pos < halfwayCheckpoint) {
            setPos(uncheckedPos)
        } else {
            onChange(event);
        }
        setIsDragging(false);
        setLastDragAt(Date.now())
    }

    const onDrag = (clientX) => {
        const startPos = props.checked ? checkedPos : uncheckedPos;
        const mousePos = startPos + clientX - startX;

        if (!isDragging && clientX !== startX) {
            setIsDragging(true);
        }
        const newPos = Math.min(
            checkedPos,
            Math.max(uncheckedPos, mousePos)
        );
        // Prevent unnecessary rerenders
        if (newPos !== pos) {
            setPos(newPos)
        }
    }

    const onMouseMove = (event) => {
        event.preventDefault();
        onDrag(event.clientX);
    }
    const onMouseUp = (event) => {
        onDragStop(event);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
    }
    const onMouseDown = (event) => {
        event.preventDefault();

        if (typeof event.button === "number" && event.button !== 0) {
            return;
        }

        onDragStart(event.clientX);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    }

    const onTouchStart = (event) => {
        onDragStart(event.touches[0].clientX);
    }

    const onTouchMove = (event) => {
        onDrag(event.touches[0].clientX);
    }

    const onTouchEnd = (event) => {
        event.preventDefault();
        onDragStop(event);
    }

    const getInputRef = (el) => {
        setInputRef(el)
    }


    const onKeyUp = () => {
        setLastKeyUpAt(Date.now())
    }

    const onInputChange = (event) => {
        if (Date.now() - lastDragAt > 50) {
            onChange(event);
        }
    }

    return (
        <div className="toggleSwitch-container">
            <div className="toggleSwitch" style={({ ...rootStyle })}>
                <div
                    className="react-switch-bg"
                    style={({ ...backgroundStyle, ...props.backgroundStyleCustom })}
                    onClick={disabled ? null : onClick}
                    onMouseDown={e => e.preventDefault()}
                >
                </div>
                <div
                    className="react-switch-handle"
                    style={handleStyle}
                    onClick={e => e.preventDefault()}
                    onMouseDown={disabled ? null : onMouseDown}
                    onTouchStart={disabled ? null : onTouchStart}
                    onTouchMove={disabled ? null : onTouchMove}
                    onTouchEnd={disabled ? null : onTouchEnd}
                >{props.checked ? 'Søg' : 'Skan'}</div>
                <input
                    type="checkbox"
                    role="switch"
                    disabled={disabled}
                    {...props.rest}
                    ref={getInputRef}
                    onKeyUp={onKeyUp}
                    onChange={onInputChange}
                />
            </div>
        </div>
    )
}
