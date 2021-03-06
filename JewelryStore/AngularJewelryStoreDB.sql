USE [master]
GO
/****** Object:  Database [AngularJewelryStoreDB]    Script Date: 5/11/2021 11:26:49 PM ******/
CREATE DATABASE [AngularJewelryStoreDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'AngularJewelryStoreDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.SQLEXPRESS\MSSQL\DATA\AngularJewelryStoreDB.mdf' , SIZE = 3072KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'AngularJewelryStoreDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.SQLEXPRESS\MSSQL\DATA\AngularJewelryStoreDB_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [AngularJewelryStoreDB] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [AngularJewelryStoreDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [AngularJewelryStoreDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [AngularJewelryStoreDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [AngularJewelryStoreDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [AngularJewelryStoreDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [AngularJewelryStoreDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [AngularJewelryStoreDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [AngularJewelryStoreDB] SET AUTO_CREATE_STATISTICS ON 
GO
ALTER DATABASE [AngularJewelryStoreDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [AngularJewelryStoreDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [AngularJewelryStoreDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [AngularJewelryStoreDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [AngularJewelryStoreDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [AngularJewelryStoreDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [AngularJewelryStoreDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [AngularJewelryStoreDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [AngularJewelryStoreDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [AngularJewelryStoreDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [AngularJewelryStoreDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [AngularJewelryStoreDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [AngularJewelryStoreDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [AngularJewelryStoreDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [AngularJewelryStoreDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [AngularJewelryStoreDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [AngularJewelryStoreDB] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [AngularJewelryStoreDB] SET  MULTI_USER 
GO
ALTER DATABASE [AngularJewelryStoreDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [AngularJewelryStoreDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [AngularJewelryStoreDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [AngularJewelryStoreDB] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
USE [AngularJewelryStoreDB]
GO
/****** Object:  StoredProcedure [dbo].[sprocEstimationInsertUpdateSingleItem]    Script Date: 5/11/2021 11:26:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create    

 PROCEDURE [dbo].[sprocEstimationInsertUpdateSingleItem] (    

  @ESId INT = 0    

 ,@GoldPrice decimal = NULL    

 ,@EWeight decimal = NULL    

 ,@Discount decimal = NULL    

 ,@TotalAmount decimal = NULL  
 ,@Createdby varchar(250)=null 
 ,@CreatedDate datetime=null
 ,@ESIDOUT int out    

 )    

AS    

DECLARE @ReturnValue INT    

    

IF (@ESId = 0) -- New Item                    

BEGIN    

 

 INSERT INTO [Estimation] (    

  GoldPrice    

  ,EWeight    

  ,Discount    
  ,TotalAmount
  

  ,Createdby    

  ,CreatedDate    

 

  )    

 VALUES (    

  @GoldPrice    

  ,@EWeight    

  ,@Discount    

  ,@TotalAmount   

  ,@Createdby    

  ,GETDATE()      

  )    

    

 SELECT @ReturnValue = SCOPE_IDENTITY()    

 set @ESIDOUT =SCOPE_IDENTITY()    

END    

ELSE    

BEGIN    

 UPDATE [Estimation]    

 SET GoldPrice = @GoldPrice    

  ,EWeight = @EWeight    

  ,Discount = @Discount    

  ,TotalAmount = @TotalAmount    

 

 WHERE Estimation.ESID = @ESId    

   
 SELECT @ReturnValue = @ESId    
  set @ESIDOUT =@ESId    

  

END    

    

IF (@@ERROR != 0)    

BEGIN    

 RETURN - 1    

END    

ELSE    

BEGIN    

 RETURN @ReturnValue    

     

END





GO
/****** Object:  StoredProcedure [dbo].[sprocEstimationListSelectList]    Script Date: 5/11/2021 11:26:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[sprocEstimationListSelectList]    



AS    



BEGIN    



    



 SET NOCOUNT ON    



 DECLARE @Err int    



    



 SELECT   *  FROM Estimation  




 SET @Err = @@Error    



    



 RETURN @Err    



END







GO
/****** Object:  StoredProcedure [dbo].[Usp_GetAllEstimation]    Script Date: 5/11/2021 11:26:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[Usp_GetAllEstimation]            

         

as            

            

begin            

            

SELECT * from  [dbo].[Estimation]           

            

end

GO
/****** Object:  Table [dbo].[Estimation]    Script Date: 5/11/2021 11:26:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Estimation](
	[ESID] [int] IDENTITY(1,1) NOT NULL,
	[GoldPrice] [decimal](18, 0) NULL,
	[EWeight] [decimal](18, 0) NULL,
	[Discount] [decimal](18, 0) NULL,
	[TotalAmount] [decimal](18, 0) NULL,
	[Createdby] [varchar](250) NULL,
	[CreatedDate] [date] NULL,
 CONSTRAINT [PK_Estimation] PRIMARY KEY CLUSTERED 
(
	[ESID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Role]    Script Date: 5/11/2021 11:26:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[RoleId] [int] IDENTITY(1,1) NOT NULL,
	[RoleName] [nvarchar](256) NOT NULL,
	[Status] [bit] NULL,
 CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Users]    Script Date: 5/11/2021 11:26:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](56) NOT NULL,
	[FullName] [nvarchar](200) NULL,
	[EmailId] [nvarchar](200) NULL,
	[Contactno] [nvarchar](10) NULL,
	[Password] [nvarchar](200) NULL,
	[Createdby] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[Status] [bit] NULL,
 CONSTRAINT [PK__Users__3214EC070F975522] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[UsersInRoles]    Script Date: 5/11/2021 11:26:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsersInRoles](
	[UserRolesId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[RoleId] [int] NULL,
 CONSTRAINT [PK_UsersInRoles] PRIMARY KEY CLUSTERED 
(
	[UserRolesId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[Estimation] ON 

INSERT [dbo].[Estimation] ([ESID], [GoldPrice], [EWeight], [Discount], [TotalAmount], [Createdby], [CreatedDate]) VALUES (1, CAST(2 AS Decimal(18, 0)), CAST(10 AS Decimal(18, 0)), CAST(2 AS Decimal(18, 0)), CAST(4 AS Decimal(18, 0)), N'1', CAST(0x80420B00 AS Date))
SET IDENTITY_INSERT [dbo].[Estimation] OFF
SET IDENTITY_INSERT [dbo].[Role] ON 

INSERT [dbo].[Role] ([RoleId], [RoleName], [Status]) VALUES (1, N'Admin', 1)
INSERT [dbo].[Role] ([RoleId], [RoleName], [Status]) VALUES (2, N'User', 1)
SET IDENTITY_INSERT [dbo].[Role] OFF
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([UserId], [UserName], [FullName], [EmailId], [Contactno], [Password], [Createdby], [CreatedDate], [Status]) VALUES (1, N'Admin', N'Admin', N'susadmin@gmail.com', N'9999999999', N'tttdoybuFsAnWJYAfwOUqg==', 1, CAST(0x0000AD2400C8D3FE AS DateTime), 1)
INSERT [dbo].[Users] ([UserId], [UserName], [FullName], [EmailId], [Contactno], [Password], [Createdby], [CreatedDate], [Status]) VALUES (2, N'User', N'User', N'User@gmail.com', N'9999999999', N'tttdoybuFsAnWJYAfwOUqg==', 1, CAST(0x0000AD2400C8D3FE AS DateTime), 1)
INSERT [dbo].[Users] ([UserId], [UserName], [FullName], [EmailId], [Contactno], [Password], [Createdby], [CreatedDate], [Status]) VALUES (4, N'superadmin', N'superadmin', N'superadmin@gmail.com', N'9999999999', N'tttdoybuFsAnWJYAfwOUqg==', 1, CAST(0x0000AD2400C8D3FE AS DateTime), 1)
INSERT [dbo].[Users] ([UserId], [UserName], [FullName], [EmailId], [Contactno], [Password], [Createdby], [CreatedDate], [Status]) VALUES (6, N'Susant', N'Sahu', N'susanta.ur@gmail.com', N'7676576576', N'tttdoybuFsAnWJYAfwOUqg==', 1, CAST(0x0000AD2400C8D3FE AS DateTime), 1)
INSERT [dbo].[Users] ([UserId], [UserName], [FullName], [EmailId], [Contactno], [Password], [Createdby], [CreatedDate], [Status]) VALUES (7, N'Sus1', N'Sahu', N'sus@gg.com', N'788988788', N'tttdoybuFsAnWJYAfwOUqg==', 1, CAST(0x0000AD25008E0A72 AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Users] OFF
SET IDENTITY_INSERT [dbo].[UsersInRoles] ON 

INSERT [dbo].[UsersInRoles] ([UserRolesId], [UserId], [RoleId]) VALUES (1, 1, 1)
INSERT [dbo].[UsersInRoles] ([UserRolesId], [UserId], [RoleId]) VALUES (2, 2, 2)
INSERT [dbo].[UsersInRoles] ([UserRolesId], [UserId], [RoleId]) VALUES (3, 5, 1)
INSERT [dbo].[UsersInRoles] ([UserRolesId], [UserId], [RoleId]) VALUES (4, 4, 2)
SET IDENTITY_INSERT [dbo].[UsersInRoles] OFF
USE [master]
GO
ALTER DATABASE [AngularJewelryStoreDB] SET  READ_WRITE 
GO
