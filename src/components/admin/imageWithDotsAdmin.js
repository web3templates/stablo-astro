import React from 'react';

class ImageWithDotsWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: props.value ? props.value.src : null,
            dots: props.value ? props.value.dots : []
        };
    }

    handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            this.setState({ imageUrl: reader.result });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    handleImageClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const dot = {
            left: `${(x / rect.width) * 100}%`,
            top: `${(y / rect.height) * 100}%`
        };
        this.setState(prevState => ({
            dots: [...prevState.dots, dot]
        }));
    };

    render() {
        return (
            <div>
                <input type="file" onChange={this.handleImageChange} />
                {this.state.imageUrl && (
                    <img 
                        src={this.state.imageUrl} 
                        onClick={this.handleImageClick} 
                        style={{ width: '100%', position: 'relative' }}
                    />
                )}
                {this.state.dots.map((dot, index) => (
                    <span 
                        key={index}
                        style={{
                            position: 'absolute',
                            top: dot.top,
                            left: dot.left,
                            width: '10px',
                            height: '10px',
                            backgroundColor: 'red',
                            transform: 'translate(-50%, -50%)'
                        }}
                    ></span>
                ))}
            </div>
        );
    }
}

export default ImageWithDotsWidget;
