

export default async function decorate(block) {
    block.innerHTML = `
    <input id="campaign-search" maxlength="512" type="search" class="campaign-search" placeholder="Search Marketing Moments...">
    <div class="filter-wrapper">
        <label for="campaign-categories">Categories</label>
        <select name="campaign-categories" id="campaign-categories" class="filters">
            <optgroup label="All Categories">
                <option value="2">2</option>
                <option value="4">4</option>
            </optgroup>
        </select>
    </div>
    <div class="filter-wrapper">
        <label for="campaign-status">Status</label>
        <select name="campaign-status" id="campaign-status" class="filters">
            <option value="2">2</option>
            <option value="4">4</option>
        </select>
    </div>
    <div class="filter-wrapper">
        <label for="campaign-business">Cloud Business</label>
        <select name="campaign-business" id="campaign-business" class="filters">
            <option value="2">2</option>
            <option value="4">4</option>
        </select>
    </div>
    <div class="filter-wrapper">
        <label for="campaign-products">Products</label>
        <select name="campaign-products" id="campaign-products" class="filters">
            <option value="2">2</option>
            <option value="4">4</option>
        </select>
    </div>
    <div class="filter-wrapper">
        <label for="campaign-other">Other (TBD)</label>    
        <select name="campaign-other" id="campaign-other" class="filters">
            <option value="2">2</option>
            <option value="4">4</option>
        </select>
    </div>
    `;
}