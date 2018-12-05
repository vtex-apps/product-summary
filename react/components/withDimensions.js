import React, { Component } from 'react'

export default function withDimensions(Wrapped) {
    return class extends Component {
        state = { width: 0, height: 0 }

        componentDidMount() {
            this.updateDimensions()
            window.addEventListener('resize', this.updateDimensions)
        }

        componentWillMount() {
            window.removeEventListener('resize', this.updateDimensions)
        }

        updateDimensions = () => {
            this.setState({ width: window.innerWidth, height: window.innerHeight })
        }

        render() {
            const { width, height } = this.state

            return (
                <Wrapped
                    {...this.props}
                    width={width}
                    height={height}
                />
            )
        }
    }
}
