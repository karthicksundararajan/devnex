# System Patterns: Devnex Client

## Architecture Overview
- Angular 20+ standalone components architecture
- Signal-based state management
- Service layer for business logic
- Component-based UI architecture

## Key Technical Decisions
1. **Standalone Components**: All components are standalone for better modularity
2. **Signal State Management**: Using Angular signals for reactive state
3. **Service Layer**:
   - FlowStoreService for diagram state
   - NodeService for node operations
   - DBModelGeneratorService for schema generation
4. **Visualization**: D3.js for flexible, interactive diagrams
5. **Component Patterns**:
   - PositionNodeComponent for draggable nodes
   - ResizableNodeComponent for size-adjustable nodes
   - ToolbarNodeComponent for interactive controls

## Design Patterns
- Observer pattern (via signals and services)
- Strategy pattern (different node behaviors)
- Composite pattern (node hierarchy)
- Facade pattern (service layer abstraction)

## Component Relationships
- AppComponent is root container
- DBVisualizerComponent likely main diagram container
- Various node components compose the visualization
- Services provide shared state and functionality
