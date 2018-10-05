﻿namespace IN2_projekti
{
    public class AppSettings
    {
        public int PageSize { get; set; } = 10;
        public int PageOffset { get; set; } = 10;
        public string ConnectionString { get; set; }
        public int AutoCompleteCount { get; set; } = 50;
        public ImageSettingsData ImageSettings { get; set; }

        public class ImageSettingsData
        {
            public int ThumbnailHeight { get; set; } = 100;
            public string LibVipsBinDir { get; set; }
        }
    }
}