import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ping } from "ldrs";

ping.register();

const LiDarViewer = () => {
    const mountRef = useRef(null);
    const [view3D, setView3D] = useState(true);
    const [imageData, setImageData] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    let renderer, scene, camera, controls;

    useEffect(() => {
        if (!mountRef.current || !view3D) return;

        setIsLoading(true); // Show loading animation

        // Initialize Scene, Camera, and Renderer
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
            75,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.set(3, 3, 3);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(
            mountRef.current.clientWidth,
            mountRef.current.clientHeight
        );
        renderer.setClearColor("#000");
        mountRef.current.appendChild(renderer.domElement);

        // Add Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(10, 10, 10);
        scene.add(directionalLight);

        // Load and Render PLY Model
        const loader = new PLYLoader();
        loader.load(
            "/claw.ply", // Replace with your file path
            (geometry) => {
                setIsLoading(false); // Hide loading animation once loaded
                geometry.center();
                const pointsMaterial = new THREE.PointsMaterial({
                    size: 0.01,
                    vertexColors: true,
                });
                const points = new THREE.Points(geometry, pointsMaterial);
                scene.add(points);

                // Adjust Camera based on Geometry
                const boundingBox = new THREE.Box3().setFromObject(points);
                const center = boundingBox.getCenter(new THREE.Vector3());
                const size = boundingBox.getSize(new THREE.Vector3());
                const maxDimension = Math.max(size.x, size.y, size.z);

                camera.position.set(center.x, center.y, maxDimension * 2);
                camera.lookAt(center);
                controls.target.copy(center);
            },
            (xhr) => console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`),
            (error) => {
                setIsLoading(false); // Hide loading animation if an error occurs
                console.error("Error loading PLY file:", error);
            }
        );

        // Add OrbitControls for Interaction
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;
        controls.minDistance = 1;
        controls.maxDistance = 50;

        // Animation Loop
        const animate = () => {
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        // Cleanup on unmount
        return () => {
            if (renderer && mountRef.current) {
                controls.dispose();
                renderer.dispose();
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, [view3D]);

    return (
        <div className="space-y-8 ">
            {/* Main Viewer Box */}
            <div className="relative w-[800px] h-[500px] bg-gray-300 dark:bg-gray-900 rounded-lg shadow-md">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
                        <l-ping size="45" speed="2" color="white"></l-ping>
                    </div>
                )}
                {view3D ? (
                    <div
                        ref={mountRef}
                        className="w-full h-full rounded-lg"
                    ></div>
                ) : imageData ? (
                    <img
                        src={imageData}
                        alt="Captured Model"
                        className="object-cover w-full h-full rounded-lg"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center rounded-lg">
                        <p>No image captured yet</p>
                    </div>
                )}
            </div>

            {/* Toggle Boxes Below Viewer */}
            <div className="grid grid-cols-2 gap-4">
                <div
                    onClick={() => setView3D(true)}
                    className={`flex items-center justify-center p-4 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 cursor-pointer ${
                        view3D ? "ring-2 ring-gray-400" : ""
                    }`}
                >
                 <p className="font-medium text-lg">Bekijk 3D</p>
                </div>
                <div
                    onClick={() => {
                        setView3D(false);
                        const canvas =
                            mountRef.current?.querySelector("canvas");
                        if (canvas) {
                            setImageData(canvas.toDataURL("image/png"));
                        }
                    }}
                    className={`flex items-center justify-center p-4 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 cursor-pointer ${
                        !view3D ? "ring-2 ring-green-400" : ""
                    }`}
                >
                    <p className="font-medium text-lg">Plattegrond Genereren</p>
                </div>
            </div>
        </div>
    );
};

export default LiDarViewer;
