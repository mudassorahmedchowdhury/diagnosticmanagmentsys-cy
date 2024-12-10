# DMS- Digonistic Management System
# Automation - Cypress

DMS is a SaaS project. Here've multiple module which are Dashboard, Departments, Patients, Bills, Parameter, Pathology, Access Management, Settings. 
And I cover regression automation testing for Departments, Patients, Bills, Parameter, Pathology modules.

## Business Logic 

### **Cash Counter:**
- Create bills from bills module.
- When bill create then patient also create. (Bill's `invoice no` = `patient id`)
- Partial bill can be paid but when discharge that full amount of bill should be paid.

### **Data Operator/Entry:**
- 
### **Parent and Child Locator Strategy:**
Instead of writing separate locators for each sidebar item, I use a single XPath to locate all parent elements:
```java
List<WebElement> parents = driver.findElements(
        By.xpath("//div[@class='left-bar hidden-print']//ul/li"));
//Adjust with your x-path or locator
```
The loop checks each parent’s text against the `parentName` parameter:
```java
for (WebElement parent : parents) {
    String text = parent.getText().trim();
    if (text.equals(parentName)) {
        parent.click();
        parentClicked = true;
        System.out.println("Clicked on parent: " + parentName);
```
### **Optional Child Click Handling**
If a child item needs to be clicked, the function further narrows down the locator to search within the selected parent:
```java
if (childName != null && !childName.isEmpty()) {
    List<WebElement> children = parent.findElements(By.xpath(".//ul/li"));
    for (WebElement child : children) {
        String childText = child.getText().trim();
        if (childText.equals(childName)) {
            child.click();
            childClicked = true;
            System.out.println("Clicked on child: " + childName);
```
This approach dynamically handles parent-child relationships without needing extra locators for every possible sidebar item.
### **Error Handling**
To ensure robustness, the function checks if the parent or child elements are found and clicked successfully. If not, error messages are logged to help identify any issues:
```java
if (!parentClicked) {
    System.err.println("Parent item '" + parentName + "' not found.");
}
if (childName != null && !childClicked) {
    System.err.println("Child item '" + childName + "' not found under parent '" + parentName + "'.");
}
```
## **Usage of the `Sidebar` Function:**
After creating the Sidebar class, it can be used to interact with any module in the sidebar with minimal code. Below is an example of how to use the function in a test case.
### **Initialize the Sidebar Class:**
First, instantiate the `Sidebar` class by passing the `WebDriver` instance to the constructor. This allows the `Sidebar` class to control the browser for navigating the sidebar.
```java
WebDriver driver = new ChromeDriver();
Sidebar sidebar = new Sidebar(driver);
```
### **Click on a Parent Item Only:**
If you only need to click on a parent module like "Dashboard", you can use the following:
```java
sidebar.clickItem("Dashboard");
```
This will search for the parent item labeled "Dashboard" and click it.
### **Click on a Parent and a Child Item**
If you need to click on a child module under a specific parent like "Settings" under "Admin", you can use the two-parameter version:
```java
sidebar.clickItem("Admin", "Settings");
```
## **Why This Approach is Efficient?**
Instead of defining locators for each sidebar item individually, this function uses a minimal number of locators and dynamically handles both parent and child clicks. This approach not only reduces the redundancy of writing locators but also ensures that future sidebar changes like adding new modules don’t require additional code changes.

By implementing this method, I’ve made the sidebar navigation easier to maintain, more readable, and less prone to errors, particularly when the sidebar structure evolves.

## Credits
This solution was developed by [Mudassor Ahmed Chowdhury](https://www.linkedin.com/in/mudassor/) – feel free to connect on LinkedIn!