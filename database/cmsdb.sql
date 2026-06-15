CREATE DATABASE cmsdb;
USE cmsdb;

-- Admin table
CREATE TABLE tbladmin (
    ID INT(11) AUTO_INCREMENT PRIMARY KEY,
    AdminName VARCHAR(50),
    UserName VARCHAR(50) UNIQUE,
    MobileNumber BIGINT(10),
    Email VARCHAR(120),
    Password VARCHAR(120),
    AdminRegdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tbladmin (AdminName, UserName, MobileNumber, Email, Password) VALUES 
('Super Admin', 'admin', '9999999999', 'admin@courier.com', '$2b$10$9fMkQFxQJxYxQxQxQxQxQO');

-- Branch table
CREATE TABLE tblbranch (
    ID INT(11) AUTO_INCREMENT PRIMARY KEY,
    BranchName VARCHAR(120),
    BranchContactnumber BIGINT(11),
    BranchEmail VARCHAR(120),
    BranchAddress VARCHAR(120),
    BranchCity VARCHAR(120),
    BranchState VARCHAR(120),
    BranchPincode VARCHAR(120),
    BranchCountry VARCHAR(120)
);

-- Staff table
CREATE TABLE tblstaff (
    ID INT(10) AUTO_INCREMENT PRIMARY KEY,
    BranchName VARCHAR(120),
    StaffName VARCHAR(120),
    StaffMobilenumber BIGINT(11),
    StaffEmail VARCHAR(120),
    StaffPassword VARCHAR(120),
    StaffRegdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INT(1) DEFAULT 1
);

-- Courier table
CREATE TABLE tblcourier (
    ID INT(11) AUTO_INCREMENT PRIMARY KEY,
    RefNumber VARCHAR(120) UNIQUE,
    SenderBranch VARCHAR(120),
    SenderName VARCHAR(120),
    SenderContactnumber BIGINT(11),
    SenderAddress VARCHAR(120),
    SenderCity VARCHAR(120),
    SenderState VARCHAR(120),
    SenderPincode VARCHAR(120),
    SenderCountry VARCHAR(120),
    RecipientName VARCHAR(120),
    RecipientContactnumber BIGINT(11),
    RecipientAddress VARCHAR(120),
    RecipientCity VARCHAR(120),
    RecipientState VARCHAR(120),
    RecipientPincode VARCHAR(120),
    RecipientCountry VARCHAR(120),
    CourierDesv VARCHAR(120),
    ParcelWeight VARCHAR(120),
    ParcelDimensionlon VARCHAR(120),
    ParcelDimensionwidth VARCHAR(120),
    ParcelDimensionheight VARCHAR(120),
    ParcelPrice VARCHAR(120),
    Status VARCHAR(124) DEFAULT 'Booked',
    CourierDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tracking history
CREATE TABLE tblcouriertracking (
    ID INT(11) AUTO_INCREMENT PRIMARY KEY,
    CourierId INT(11),
    remark MEDIUMTEXT,
    status VARCHAR(255),
    StatusDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (CourierId) REFERENCES tblcourier(ID) ON DELETE CASCADE
);

-- Complaints
CREATE TABLE tblcomplains (
    ID INT(10) AUTO_INCREMENT PRIMARY KEY,
    TicketNumber INT(10),
    TrackingNumber INT(10),
    NatureOfComplain VARCHAR(200),
    IssuesDesc MEDIUMTEXT,
    CompDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status VARCHAR(50) DEFAULT 'Open',
    Remark VARCHAR(200),
    UpdationDate TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

-- Enquiries
CREATE TABLE tblcontact (
    ID INT(10) AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(200),
    MobileNumber BIGINT(10),
    Email VARCHAR(200),
    Message MEDIUMTEXT,
    MsgDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    IsRead INT(5) DEFAULT 0
);

-- Pages (About Us / Contact)
CREATE TABLE tblpage (
    ID INT(11) AUTO_INCREMENT PRIMARY KEY,
    PageType VARCHAR(100) UNIQUE,
    PageTitle VARCHAR(200),
    PageDescription MEDIUMTEXT,
    Email VARCHAR(120),
    MobileNumber BIGINT(11),
    Address TEXT
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role ENUM('admin','staff') DEFAULT 'staff',
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE branches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    branch_name VARCHAR(100),
    city VARCHAR(100),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE couriers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tracking_number VARCHAR(50) UNIQUE,

    sender_name VARCHAR(100),
    sender_phone VARCHAR(20),
    sender_address TEXT,

    receiver_name VARCHAR(100),
    receiver_phone VARCHAR(20),
    receiver_address TEXT,

    source_branch INT,
    destination_branch INT,

    weight DECIMAL(10,2),
    amount DECIMAL(10,2),

    status ENUM(
        'Booked',
        'Picked Up',
        'In Transit',
        'Out For Delivery',
        'Delivered'
    ) DEFAULT 'Booked',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (source_branch) REFERENCES branches(id),
    FOREIGN KEY (destination_branch) REFERENCES branches(id)
);

CREATE TABLE courier_tracking (
    id INT AUTO_INCREMENT PRIMARY KEY,
    courier_id INT,
    status VARCHAR(100),
    remarks TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (courier_id)
    REFERENCES couriers(id)
    ON DELETE CASCADE
);

CREATE TABLE complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tracking_number VARCHAR(50),
    customer_name VARCHAR(100),
    complaint TEXT,
    status ENUM('Open','Closed') DEFAULT 'Open',
    solution TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tblpage (PageType, PageTitle, PageDescription, Email, MobileNumber, Address) VALUES
('aboutus', 'About Courier Management System', 'We provide fast and reliable courier services across the country.', 'support@courier.com', 9876543210, '123, Main Street, City'),
('contactus', 'Contact Us', 'Get in touch with us', 'contact@courier.com', 9876543210, '123, Main Street, City');