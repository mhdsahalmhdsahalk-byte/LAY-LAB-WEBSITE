// Setup aliases
const Engine = Matter.Engine,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Events = Matter.Events;

const engine = Engine.create();
const world = engine.world;

// 1. Configure the World
// Reduced gravity creates the "floating portfolio" feeling
engine.gravity.y = 0.4;

// Track bounds
let width = window.innerWidth;
let height = window.innerHeight;

// 2. Setup Boundaries (Walls & Floor & Ceiling)
const wallOptions = { 
    isStatic: true, 
    render: { visible: false },
    restitution: 0.5,
    friction: 0.2
};
let ground, leftWall, rightWall, ceiling;

function createBoundaries() {
    if (ground) {
        Composite.remove(world, [ground, leftWall, rightWall, ceiling]);
    }
    const thickness = 200; // Thick to prevent items phasing through at high speeds
    ground = Bodies.rectangle(width / 2, height + thickness / 2, width + thickness * 2, thickness, wallOptions);
    ceiling = Bodies.rectangle(width / 2, -thickness / 2, width + thickness * 2, thickness, wallOptions);
    leftWall = Bodies.rectangle(-thickness / 2, height / 2, thickness, height * 2, wallOptions);
    rightWall = Bodies.rectangle(width + thickness / 2, height / 2, thickness, height * 2, wallOptions);
    
    Composite.add(world, [ground, leftWall, rightWall, ceiling]);
}
createBoundaries();

window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    createBoundaries();
});

// 3. Setup Mouse Constraint constraints physics to clicks
const mouse = Mouse.create(document.body);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2, // Elasticity of the grab
        render: { visible: false }
    }
});
Composite.add(world, mouseConstraint);

// Very important: don't let Matter JS hijack normal scrolling completely if the user clicks nothing
mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);


// 4. Map HTML DOM Elements to Physics Bodies
const domElements = document.querySelectorAll('.physics-el');
const bodiesMap = [];

window.addEventListener('load', () => {
    domElements.forEach((el, index) => {
        // Read DOM dimensions
        const rect = el.getBoundingClientRect();
        const elWidth = rect.width;
        const elHeight = rect.height;
        
        // Stagger spawn positions
        const xPos = (width / 2) + (Math.random() - 0.5) * (width * 0.5);
        // Start them high above the screen to fall down gracefully
        const yPos = -elHeight - (Math.random() * 800) - (index * 200);

        const isCircle = el.getAttribute('data-type') === 'circle';
        const customRestitution = parseFloat(el.getAttribute('data-restitution')) || 0.4;
        
        let body;

        if (isCircle) {
            body = Bodies.circle(xPos, yPos, elWidth / 2, {
                restitution: customRestitution,
                friction: 0.1,
                frictionAir: 0.02,
                density: 0.005
            });
        } else {
            // Pill / Rectangle
            const radius = el.classList.contains('heading') || el.classList.contains('brand') || el.classList.contains('pill') ? 40 : 24;
            
            body = Bodies.rectangle(xPos, yPos, elWidth, elHeight, {
                restitution: customRestitution,
                friction: 0.2,
                frictionAir: 0.02,
                density: 0.002,
                chamfer: { radius: radius } // Perfectly matches DOM border-radius
            });
        }

        // Apply a fun small initial spin to add chaos
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.1);

        Composite.add(world, body);
        bodiesMap.push({ dom: el, body: body, width: elWidth, height: elHeight });
        
        // For buttons to still be clickable inside interactive elements:
        // When drag ends, if no significant movement occurred, we could fire an event, 
        // but simple <a> tags inside grabbing blocks usually work correctly as long as we don't `event.preventDefault()` everything.
    });

    // 5. Start Physics Engine
    Runner.run(Runner.create(), engine);

    // 6. Sync DOM Transforms to Physics Engine update loop
    Events.on(engine, 'afterUpdate', function() {
        for (let i = 0; i < bodiesMap.length; i++) {
            const item = bodiesMap[i];
            
            // Matter JS body positions are tracked exactly at the center of the body.
            // HTML positions are tracked from the top-left origin.
            // We must subtract half the width/height to perfectly align the overlay
            const x = item.body.position.x - (item.width / 2);
            const y = item.body.position.y - (item.height / 2);
            const angle = item.body.angle;

            item.dom.style.transform = `translate(${x}px, ${y}px) rotate(${angle}rad)`;
        }
    });
});
