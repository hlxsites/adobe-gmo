# InfiniteResultsDatasource
The [InfiniteResultsContainer](InfiniteResultsContainer.js) is a JavaScript class that is used to manage and display a potentially infinite list of results in a web page. It's designed to work with a datasource, which provides the actual data to display.

Here's a high-level overview of what it does:

- **Initialization**: When an `InfiniteResultsContainer` is created, it's given a block (an HTML element) and a datasource. The datasource must implement certain methods that the `InfiniteResultsContainer` uses to fetch and display data.

- **Data Fetching**: The `InfiniteResultsContainer` uses the datasource to fetch data. If the datasource supports paging, the `InfiniteResultsContainer` can fetch more data as needed.

- **Rendering**: The `InfiniteResultsContainer` uses the datasource to create HTML elements for each item in the data. These elements are then added to the block.

- **Item Selection**: The `InfiniteResultsContainer` can handle selection of items. When an item is selected or deselected, it calls corresponding methods on the datasource.

This class is useful in scenarios where you have a large amount of data that you want to display in a web page, but you don't want to fetch all the data at once (which could be slow and use a lot of memory). Instead, you can fetch and display a small portion of the data at a time, updating the display as the user interacts with it. This is often referred to as "infinite scrolling" or "lazy loading".

# Creating a Custom Datasource

A custom datasource is an object that provides data to the `InfiniteResultsContainer` class. It must implement certain required methods, and can optionally implement additional methods for more advanced functionality.

## Required Methods

### getItemId(item)

This method should return a unique identifier for a given item. The `item` parameter is an object representing a single item in the data source.

### createItemElement(item)

This method should create and return an HTML element for a given item. The `item` parameter is an object representing a single item in the data source.

### registerResultsCallback(container, callback)

This method should register a callback function that will be called when new results are available. The `container` parameter is the HTML element where the results should be rendered, and the `callback` parameter is the function to call when new results are available.

## Optional Methods

### showMore()

If your datasource supports paging, this method should fetch and return the next page of results.

### onItemSelected(itemElement, itemId)

This method is called when an item is selected. It receives the HTML element of the item (`itemElement`) and its unique identifier (`itemId`).

### onItemDeselected(itemElement, itemId)

This method is called when an item is deselected. It receives the HTML element of the item (`itemElement`) and its unique identifier (`itemId`).

### onItemAddedToMultiSelection(itemElement, itemId)

This method is called when an item is added to multi-selection. It receives the HTML element of the item (`itemElement`) and its unique identifier (`itemId`).

### onItemRemovedFromMultiSelection(itemElement, itemId)

This method is called when an item is removed from multi-selection. It receives the HTML element of the item (`itemElement`) and its unique identifier (`itemId`).

### getExcludedItemActions()

This method should return a list of actions that should be excluded for items in this datasource.

### noResultsMessage()

This method should return a message to display when there are no results available.

### notFoundMessage()

This method should return a message to display when a specific entity referred by the container isn't found. For example, if you're trying to load a specific collection with ID 1234 but it doesn't exist, this message will be displayed.

## Example
See [blocks/adp-infinite-results-collections](blocks/adp-infinite-results-collections)

Here's an example of how you might define a custom datasource:

```javascript
class MyDataSource {
  constructor() {
    // Initialize your data source here
  }

  getItemId(item) {
    // Return a unique ID for the item
  }

  createItemElement(item) {
    // Create and return an HTML element for the item
  }

  registerResultsCallback(container, callback) {
    // Register the callback function
  }

  showMore() {
    // ...
  }
  // Implement additional methods as needed...
}
```

You can then use your custom datasource with an `InfiniteResultsContainer` like this:

```javascript
const datasource = new MyDataSource();
const container = new InfiniteResultsContainer(block, datasource);
```

Remember to replace `MyDataSource` with your actual datasource class name, and implement all required and necessary optional methods according to your application's needs.